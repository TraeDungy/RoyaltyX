import uuid
from django.contrib.auth import get_user_model
from django.db import models
from common.models import BaseModel

User = get_user_model()


class SupportTicket(BaseModel):
    """
    Represents a customer support ticket/conversation
    """
    STATUS_CHOICES = [
        ('open', 'Open'),
        ('in_progress', 'In Progress'),
        ('resolved', 'Resolved'),
        ('closed', 'Closed'),
    ]
    
    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('urgent', 'Urgent'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    ticket_number = models.CharField(max_length=20, unique=True, editable=False)
    subject = models.CharField(max_length=255)
    customer = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name="support_tickets"
    )
    assigned_admin = models.ForeignKey(
        User, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name="assigned_tickets",
        limit_choices_to={'is_staff': True}
    )
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='open')
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, default='medium')
    first_response_at = models.DateTimeField(null=True, blank=True)
    resolved_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        ordering = ['-created_at']
        
    def __str__(self):
        return f"#{self.ticket_number} - {self.subject}"
    
    def save(self, *args, **kwargs):
        if not self.ticket_number:
            # Generate ticket number like #SUP-2024-001
            from django.utils import timezone
            year = timezone.now().year
            last_ticket = SupportTicket.objects.filter(
                ticket_number__startswith=f'SUP-{year}'
            ).order_by('-ticket_number').first()
            
            if last_ticket:
                last_number = int(last_ticket.ticket_number.split('-')[-1])
                new_number = last_number + 1
            else:
                new_number = 1
                
            self.ticket_number = f'SUP-{year}-{new_number:03d}'
        
        super().save(*args, **kwargs)


class SupportMessage(BaseModel):
    """
    Represents a message in a support ticket conversation
    """
    MESSAGE_TYPE_CHOICES = [
        ('customer', 'Customer Message'),
        ('admin', 'Admin Reply'),
        ('system', 'System Message'),
    ]

    ticket = models.ForeignKey(
        SupportTicket, 
        on_delete=models.CASCADE, 
        related_name="messages"
    )
    sender = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name="support_messages"
    )
    message_type = models.CharField(max_length=20, choices=MESSAGE_TYPE_CHOICES)
    content = models.TextField()
    is_internal_note = models.BooleanField(default=False)  # For admin-only notes
    
    class Meta:
        ordering = ['created_at']
        
    def __str__(self):
        return f"Message in {self.ticket.ticket_number} by {self.sender.name}"
    
    def save(self, *args, **kwargs):
        # Auto-determine message type based on sender
        if not self.message_type:
            if self.sender.is_staff:
                self.message_type = 'admin'
            else:
                self.message_type = 'customer'
        
        # Update ticket's first_response_at if this is the first admin response
        if (self.message_type == 'admin' and 
            not self.ticket.first_response_at and 
            not self.is_internal_note):
            from django.utils import timezone
            self.ticket.first_response_at = timezone.now()
            self.ticket.save()
        
        super().save(*args, **kwargs)


class SupportAttachment(BaseModel):
    """
    File attachments for support messages
    """
    message = models.ForeignKey(
        SupportMessage, 
        on_delete=models.CASCADE, 
        related_name="attachments"
    )
    file = models.FileField(upload_to='support_attachments/')
    filename = models.CharField(max_length=255)
    file_size = models.PositiveIntegerField()
    
    def __str__(self):
        return f"Attachment: {self.filename}"
