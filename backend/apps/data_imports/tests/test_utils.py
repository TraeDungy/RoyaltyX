from io import BytesIO

from apps.data_imports.utils import report_processing


def make_file(text: str) -> BytesIO:
    return BytesIO(text.encode("utf-8"))


def test_detect_delimiter_comma():
    f = make_file("a,b,c\n1,2,3")
    assert report_processing.detect_delimiter(f) == ","


def test_validate_csv_valid_and_invalid():
    valid = make_file("a,b\n1,2")
    assert report_processing.validate_csv(valid)

    invalid = make_file("")
    assert not report_processing.validate_csv(invalid)


def test_read_csv_with_custom_mapping():
    f = make_file("title,qty\nfoo,3")
    rows = report_processing.read_csv(f, {"title": "Title", "qty": "Quantity"})
    assert rows == [{"Title": "foo", "Quantity": "3"}]


def test_parse_month_year_from_filename():
    assert report_processing.parse_month_year_from_filename("sales_2024-03.csv") == (3, 2024)
    assert report_processing.parse_month_year_from_filename("03-2024_report.csv") == (3, 2024)
    assert report_processing.parse_month_year_from_filename("jan2025data.csv") == (1, 2025)


def test_parse_date_string_various_formats():
    dt = report_processing.parse_date_string("2024-05-01")
    assert dt.year == 2024 and dt.month == 5 and dt.day == 1

    dt = report_processing.parse_date_string("01/05/2024")
    assert dt.year == 2024 and dt.month == 5 and dt.day == 1

    dt = report_processing.parse_date_string("May 2024")
    assert dt.year == 2024 and dt.month == 5 and dt.day == 1


def test_parse_date_string_invalid():
    assert report_processing.parse_date_string("not-a-date") is None

