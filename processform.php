    <?php
    if (isset($_POST['email'])) {
        $email_to = "jessica@grare.com"; // Replace with your email
        $email_subject = "New Contact Form Submission";

        $name = $_POST['name'];
        $email_from = $_POST['email'];
        $message = $_POST['message'];

        $email_body = "Name: $name\n" .
                      "Email: $email_from\n" .
                      "Message:\n$message";

        // Use mail() function or a library like PHPMailer to send the email
        mail($email_to, $email_subject, $email_body, "From: $email_from");

        // Redirect to a thank you page or display a success message
        header("Location: thank_you.html");
        exit();
    }
    ?>