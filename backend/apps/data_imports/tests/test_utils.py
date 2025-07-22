from io import BytesIO

import pytest

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
