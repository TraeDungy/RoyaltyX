from django.contrib import admin

from .models import AppliedFee, FeeRule, FeeType


@admin.register(FeeType)
class FeeTypeAdmin(admin.ModelAdmin):
    list_display = ("name", "is_active", "created_at")
    search_fields = ("name",)


@admin.register(FeeRule)
class FeeRuleAdmin(admin.ModelAdmin):
    list_display = ("fee_type", "project", "sale_type", "percentage", "fixed_amount", "is_active")
    list_filter = ("project", "sale_type")


@admin.register(AppliedFee)
class AppliedFeeAdmin(admin.ModelAdmin):
    list_display = ("sale", "fee_type", "amount", "created_at")
    list_filter = ("fee_type",)
