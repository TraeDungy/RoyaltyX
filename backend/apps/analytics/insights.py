from typing import Any, Dict, List


def _format_change(prev: float, curr: float) -> str:
    """Return a human friendly percentage change."""
    if prev == 0:
        if curr == 0:
            return "remained at 0"
        return f"increased from 0 to {curr}"

    diff = curr - prev
    if diff == 0:
        return "remained unchanged"
    pct = diff / prev * 100
    direction = "increased" if diff > 0 else "decreased"
    return f"{direction} by {abs(pct):.1f}%"


def generate_monthly_insights(
    monthly_stats: List[Dict[str, Any]],
) -> List[Dict[str, str]]:
    """Generate month over month performance insights."""
    insights: List[Dict[str, str]] = []
    if len(monthly_stats) < 2:
        return insights

    for prev, curr in zip(monthly_stats, monthly_stats[1:]):
        impressions = _format_change(prev["impressions"], curr["impressions"])
        sales = _format_change(prev["sales"], curr["sales"])
        revenue = _format_change(
            float(prev["royalty_revenue"]), float(curr["royalty_revenue"])
        )
        msg = (
            f"Impressions {impressions}, sales {sales}, "
            f"royalty revenue {revenue}."
        )
        insights.append({"month": curr["month"], "insight": msg})

    return insights
