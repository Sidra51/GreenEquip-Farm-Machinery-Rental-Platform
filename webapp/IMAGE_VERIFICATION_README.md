# Image Verification System

This system implements a CNN-based image classification model to verify if uploaded images match their respective categories.

## How It Works

1. When a seller uploads an image with a listing, the system runs a CNN model to classify the image content
2. The model compares the predicted category with the selected category
3. If they don't match, the listing is flagged in the admin panel
4. Admins can review flagged images and take appropriate action

## Files Added

- `image_classifier.py` - Contains the CNN model and classification logic
- `verify_image.py` - Script called from Node.js to verify images
- `train_image_classifier.py` - Script to train the model with existing images
- Updated `models/Listing.js` - Added image verification fields
- Updated `routes/seller.js` - Added image verification on listing creation
- Updated `views/admin.ejs` - Shows warnings for suspicious images

## Setup Instructions

1. Install required Python packages:

   ```
   pip install -r requirements.txt
   ```

2. Train the CNN model:

   ```
   python train_image_classifier.py
   ```

   Note: This will copy images from the `pics` directory into a temporary `training_data` directory and train the model.

3. Start the server:
   ```
   npm start
   ```

## Database Schema Changes

Added the following fields to the Listing model:

```javascript
imageVerification: {
  status: { type: String, enum: ['verified', 'flagged', 'pending'], default: 'pending' },
  predictedCategory: { type: String },
  confidence: { type: Number },
  isCorrect: { type: Boolean }
}
```

## Admin Panel Features

- Listings with suspicious images are marked with a red "Suspicious Image" badge
- Verified images are marked with a green "Verified" badge
- Admins can review and approve/reject listings as usual

## Training Data

The system uses existing images in the `pics/` directory to train the model. Each subdirectory name is treated as a category (e.g., `pics/axe/`, `pics/tractor/`, etc.).

## Troubleshooting

- If the model is not found, run `python train_image_classifier.py` to train it
- If Python integration isn't working, ensure Python is in your system PATH
- Make sure all required Python packages are installed
