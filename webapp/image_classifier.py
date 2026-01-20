import tensorflow as tf
from tensorflow.keras import layers, models
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.optimizers import Adam
import numpy as np
import os
import cv2
from sklearn.metrics import classification_report, confusion_matrix
import joblib


class ImageClassifier:
    def __init__(self):
        self.model = None
        self.categories = ['Axe', 'Tractor', 'Rotavator',
                           'Seeder', 'Harvester', 'Sprayer', 'Tiller', 'Baler']
        self.img_size = 224

    def build_model(self):
        """Build a CNN model using transfer learning with MobileNetV2"""
        base_model = MobileNetV2(
            weights='imagenet',
            include_top=False,
            input_shape=(self.img_size, self.img_size, 3)
        )

        base_model.trainable = False  # Freeze base model

        self.model = models.Sequential([
            base_model,
            layers.GlobalAveragePooling2D(),
            layers.Dropout(0.2),
            layers.Dense(128, activation='relu'),
            layers.Dropout(0.2),
            layers.Dense(len(self.categories), activation='softmax')
        ])

        self.model.compile(
            optimizer=Adam(learning_rate=0.0001),
            loss='categorical_crossentropy',
            metrics=['accuracy']
        )

        return self.model

    def prepare_data(self, data_dir):
        """Prepare training data using data augmentation"""
        train_datagen = ImageDataGenerator(
            rescale=1./255,
            rotation_range=20,
            width_shift_range=0.2,
            height_shift_range=0.2,
            horizontal_flip=True,
            zoom_range=0.2,
            validation_split=0.2
        )

        train_generator = train_datagen.flow_from_directory(
            data_dir,
            target_size=(self.img_size, self.img_size),
            batch_size=32,
            class_mode='categorical',
            subset='training'
        )

        validation_generator = train_datagen.flow_from_directory(
            data_dir,
            target_size=(self.img_size, self.img_size),
            batch_size=32,
            class_mode='categorical',
            subset='validation'
        )

        return train_generator, validation_generator

    def train(self, data_dir, epochs=10):
        """Train the model"""
        if self.model is None:
            self.build_model()

        train_gen, val_gen = self.prepare_data(data_dir)

        history = self.model.fit(
            train_gen,
            epochs=epochs,
            validation_data=val_gen,
            steps_per_epoch=train_gen.samples // train_gen.batch_size,
            validation_steps=val_gen.samples // val_gen.batch_size
        )

        return history

    def fine_tune(self, data_dir, epochs=5):
        """Fine-tune the model by unfreezing some layers"""
        # Unfreeze top layers of the base model
        self.model.layers[0].trainable = True

        # Fine-tune from this layer onwards
        fine_tune_at = len(self.model.layers[0].layers) - 20

        # Freeze all the layers before fine_tune_at
        for layer in self.model.layers[0].layers[:fine_tune_at]:
            layer.trainable = False

        self.model.compile(
            optimizer=Adam(learning_rate=0.0001/10),  # Lower learning rate
            loss='categorical_crossentropy',
            metrics=['accuracy']
        )

        train_gen, val_gen = self.prepare_data(data_dir)

        history = self.model.fit(
            train_gen,
            epochs=epochs,
            validation_data=val_gen,
            steps_per_epoch=train_gen.samples // train_gen.batch_size,
            validation_steps=val_gen.samples // val_gen.batch_size
        )

        return history

    def predict_category(self, image_path):
        """Predict the category of an image"""
        img = cv2.imread(image_path)
        if img is None:
            return None, 0.0

        img = cv2.resize(img, (self.img_size, self.img_size))
        img = img / 255.0
        img = np.expand_dims(img, axis=0)

        predictions = self.model.predict(img)
        predicted_class_idx = np.argmax(predictions[0])
        confidence = predictions[0][predicted_class_idx]

        predicted_category = self.categories[predicted_class_idx]

        return predicted_category, confidence

    def verify_image_category(self, image_path, expected_category):
        """Verify if the image matches the expected category"""
        predicted_category, confidence = self.predict_category(image_path)

        if predicted_category is None:
            return False, "Could not process image", 0.0

        # Normalize category names for comparison
        expected_normalized = expected_category.lower().strip()
        predicted_normalized = predicted_category.lower().strip()

        # Check if the predicted category matches the expected one
        is_correct = expected_normalized == predicted_normalized

        # Also provide confidence score
        return is_correct, predicted_category, confidence

    def save_model(self, filepath):
        """Save the trained model"""
        self.model.save(filepath)

    def load_model(self, filepath):
        """Load a pre-trained model"""
        self.model = tf.keras.models.load_model(filepath)


def train_image_classifier():
    """Function to train the image classifier model"""
    classifier = ImageClassifier()

    # Assuming image data is organized in folders like:
    # pics/Axe/
    # pics/Tractor/
    # etc.
    data_dir = os.path.join(os.path.dirname(__file__), 'pics')

    if os.path.exists(data_dir):
        print("Training image classifier...")
        classifier.train(data_dir, epochs=10)

        # Fine-tune the model
        print("Fine-tuning model...")
        classifier.fine_tune(data_dir, epochs=5)

        # Save the model
        model_path = os.path.join(os.path.dirname(
            __file__), 'image_classifier_model.h5')
        classifier.save_model(model_path)
        print(f"Model saved to {model_path}")

        return classifier
    else:
        print(
            f"Data directory {data_dir} does not exist. Please organize your images in category folders.")
        return None


def classify_single_image(image_path, expected_category):
    """Classify a single image and verify if it matches the expected category"""
    model_path = os.path.join(os.path.dirname(
        __file__), 'image_classifier_model.h5')

    if not os.path.exists(model_path):
        # Don't print to stdout here since that interferes with JSON output from verify_image.py
        return False, "Unknown", 0.0

    classifier = ImageClassifier()
    try:
        classifier.load_model(model_path)
    except Exception as e:
        # Don't print to stdout here since that interferes with JSON output from verify_image.py
        return False, "Model Error", 0.0

    is_correct, predicted_category, confidence = classifier.verify_image_category(
        image_path, expected_category
    )

    return is_correct, predicted_category, confidence


if __name__ == "__main__":
    # If run as main script, train the model
    train_image_classifier()
