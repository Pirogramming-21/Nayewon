from django import template

register = template.Library()

@register.filter
def convert_minutes(value):
    try:
        value = int(value)
        hours, minutes = divmod(value, 60)
        return f"{hours}시간 {minutes}분"
    except (ValueError, TypeError):
        return value
