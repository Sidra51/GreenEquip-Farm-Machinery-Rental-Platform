import os
import shutil
from image_classifier import ImageClassifier
import tensorflow as tf


def prepare_training_data():
    """
    Prepare training data by organizing existing images into category folders
    """
    # Define source and destination directories
    pics_dir = os.path.join(os.path.dirname(__file__), 'pics')
    training_dir = os.path.join(os.path.dirname(__file__), 'training_data')

    # Create training directory if it doesn't exist
    if not os.path.exists(training_dir):
        os.makedirs(training_dir)

    # Categories we want to classify
    categories = ['Axe', 'Tractor', 'Rotavator', 'Seeder',
                  'Harvester', 'Sprayer', 'Tiller', 'Baler']

    # Create subdirectories for each category
    for category in categories:
        category_dir = os.path.join(training_dir, category)
        if not os.path.exists(category_dir):
            os.makedirs(category_dir)

    # Copy images from existing categories to training directory
    for category in categories:
        src_category_dir = os.path.join(pics_dir, category)
        dst_category_dir = os.path.join(training_dir, category)

        if os.path.exists(src_category_dir):
            # Copy all images from source to destination
            for filename in os.listdir(src_category_dir):
                src_file = os.path.join(src_category_dir, filename)
                dst_file = os.path.join(dst_category_dir, filename)

                if os.path.isfile(src_file) and any(filename.lower().endswith(ext) for ext in ['.jpg', '.jpeg', '.png', '.gif']):
                    shutil.copy2(src_file, dst_file)
                    print(f"Copied {filename} to {dst_category_dir}")

    return training_dir


def train_model():
    """
    Train the image classifier model
    """
    print("Preparing training data...")
    training_dir = prepare_training_data()

    print("Initializing classifier...")
    classifier = ImageClassifier()

    # Build the model
    classifier.build_model()

    print("Starting training...")
    # Train the model
    history = classifier.train(training_dir, epochs=10)

    print("Starting fine-tuning...")
    # Fine-tune the model
    classifier.fine_tune(training_dir, epochs=5)

    # Save the model
    model_path = os.path.join(os.path.dirname(
        __file__), 'image_classifier_model.h5')
    classifier.save_model(model_path)
    print(f"Model saved to {model_path}")

    return classifier


if __name__ == "__main__":
    # Disable GPU to avoid potential issues
    os.environ['CUDA_VISIBLE_DEVICES'] = '-1'

    # Limit TensorFlow GPU memory growth if GPU is available
    gpus = tf.config.experimental.list_physical_devices('GPU')
    if gpus:
        try:
            for gpu in gpus:
                tf.config.experimental.set_memory_growth(gpu, True)
        except RuntimeError as e:
            print(e)

    try:
        classifier = train_model()
        print("Training completed successfully!")
    except Exception as e:
        print(f"Error during training: {e}")
        import traceback
        traceback.print_exc()
