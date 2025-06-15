curl -L -O https://tfb-status.techempower.com/raw/results.2025-06-13-23-25-42-351.zip
unzip results.2025-06-13-23-25-42-351.zip
python3 main.py . 20250608081435
mv docs/20250608081435 docs/latest