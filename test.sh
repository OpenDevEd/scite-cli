#!/bin/bash
set -x

tool="scite-cli"
echo "------------------------ ${tool} -----------------------------------------------------"
$tool search --count EdTech OR "educational technology" OR "education technology"
$tool search --count EdTech OR "\"educational technology\"" OR "\"education technology\""
$tool search --count test_quote_1...
$tool search --count test_quote_2...