import sys
import json
import os
from image_classifier import classify_single_image


def main():
    try:
        # Get image path and expected category from command line arguments
        if len(sys.argv) != 3:
            result = {
                "success": False,
                "error": "Invalid arguments. Usage: python verify_image.py <image_path> <expected_category>"
            }
            print(json.dumps(result))
            return

        image_path = sys.argv[1]
        expected_category = sys.argv[2]

        # Verify if the image matches the expected category
        is_correct, predicted_category, confidence = classify_single_image(
            image_path, expected_category)

        result = {
            "success": True,
            "is_correct": is_correct,
            "predicted_category": predicted_category,
            "confidence": float(confidence),
            "expected_category": expected_category
        }

        print(json.dumps(result))

    except Exception as e:
        result = {
            "success": False,
            "error": str(e)
        }
        print(json.dumps(result))


if __name__ == "__main__":
    main()
