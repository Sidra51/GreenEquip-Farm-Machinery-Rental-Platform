const { exec } = require("child_process");
const path = require("path");

/**
 * Test script to verify the image verification functionality
 */
async function testImageVerification() {
  console.log("Testing image verification functionality...");

  // Path to the verify_image.py script
  const verifyScript = path.join(__dirname, "verify_image.py");

  // Test with a fake image path (this would fail gracefully)
  const fakeImagePath = path.join(__dirname, "pics", "axe", "nonexistent.jpg");
  const expectedCategory = "Axe";

  console.log(`Testing with fake image: ${fakeImagePath}`);

  const pythonProcess = exec(
    `python "${verifyScript}" "${fakeImagePath}" "${expectedCategory}"`,
    (error, stdout, stderr) => {
      if (error) {
        console.log(
          "Expected error for nonexistent file (this is normal):",
          error.message
        );
      }

      if (stderr) {
        console.log("Stderr:", stderr);
      }

      console.log("Output:", stdout);

      try {
        const result = JSON.parse(stdout);
        if (result.success) {
          console.log("✅ Image verification is working correctly");
          console.log(`   - Is correct: ${result.is_correct}`);
          console.log(`   - Predicted category: ${result.predicted_category}`);
          console.log(`   - Confidence: ${result.confidence}`);
        } else {
          console.log("❌ Image verification returned an error:", result.error);
        }
      } catch (parseError) {
        console.log(
          "❌ Could not parse verification result:",
          parseError.message
        );
      }
    }
  );

  // Wait a bit for the process to complete
  setTimeout(() => {
    console.log("\nTesting completed.");
    console.log("\nTo test the full functionality:");
    console.log(
      "1. Install required Python packages: pip install -r requirements.txt"
    );
    console.log("2. Train the model: python train_image_classifier.py");
    console.log("3. Start the server: npm start in the webapp directory");
    console.log(
      "4. Upload an image in the wrong category to see the warning in the admin panel"
    );
  }, 2000);
}

// Run the test
testImageVerification();
