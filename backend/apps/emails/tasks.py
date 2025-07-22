from celery import shared_task

from .services import Email

@shared_task
def task_send_email(subject, message, recipient_list, from_email=None, fail_silently=False):
    """Asynchronously send a simple email."""
    return Email.send(subject, message, recipient_list, from_email, fail_silently)


@shared_task
def task_send_html_email(subject, html_content, recipient_list, text_content=None, from_email=None, fail_silently=False):
    """Asynchronously send an HTML email."""
    return Email.send_html_email(
        subject,
        html_content,
        recipient_list,
        text_content,
        from_email,
        fail_silently,
    )


@shared_task
def task_send_template_email(subject, template_name, context, recipient_list, from_email=None, fail_silently=False):
    """Asynchronously send an email using a template."""
    return Email.send_template_email(
        subject,
        template_name,
        context,
        recipient_list,
        from_email,
        fail_silently,
    )


@shared_task
def task_send_db_template_email(template_name, context, recipient_list, from_email=None, fail_silently=False):
    """Asynchronously send an email using a DB-stored template."""
    return Email.send_db_template_email(
        template_name,
        context,
        recipient_list,
        from_email,
        fail_silently,
    )
