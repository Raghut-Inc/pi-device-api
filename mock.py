#!/usr/bin/env python3
import time

def main():
    print("🚫 Camera + YOLO disabled — sending mock triggers...")
    for i in range(3):
        print("__TRIGGER__")
        time.sleep(3)

if __name__ == "__main__":
    main()
