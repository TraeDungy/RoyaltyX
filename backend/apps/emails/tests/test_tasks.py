from django.test import TestCase
from unittest.mock import patch

from apps.emails.utils import send_welcome_email
from apps.emails.tasks import task_send_db_template_email


class EmailTaskTests(TestCase):
    def test_send_welcome_email_queues_task(self):
        with patch('apps.emails.utils.task_send_db_template_email.delay') as mock_delay:
            result = send_welcome_email('user@example.com', 'User')
            self.assertTrue(result)
            mock_delay.assert_called_once()
            kwargs = mock_delay.call_args.kwargs
            self.assertEqual(kwargs['template_name'], 'welcome')
            self.assertEqual(kwargs['recipient_list'], ['user@example.com'])
            self.assertIn('dashboard_url', kwargs['context'])

    def test_task_send_db_template_email_calls_service(self):
        with patch('apps.emails.tasks.Email.send_db_template_email') as mock_send:
            mock_send.return_value = True
            result = task_send_db_template_email.apply(kwargs={
                'template_name': 'welcome',
                'context': {'user_name': 'User'},
                'recipient_list': ['user@example.com'],
                'from_email': None,
                'fail_silently': False,
            })
            self.assertTrue(result.result)
            mock_send.assert_called_once_with(
                'welcome',
                {'user_name': 'User'},
                ['user@example.com'],
                None,
                False,
            )
