function s(n, productId) {
  const stars = document.querySelectorAll(`#product-${productId} .star`);
  const output = document.querySelector(`#output-${productId}`);

  stars.forEach(star => star.classList.remove("active"));

  for (let i = 0; i < n; i++) {
      stars[i].classList.add("active");
  }
  output.innerText = `Rating is: ${n}/5`;
}

function feedback() {
  const reviews = document.querySelectorAll("article");
  let message = "Thank you for submitting your feedback!\n\n";
  let isValid = true;

  reviews.forEach((review, index) => {
      const productId = index + 1;
      const productName = review.querySelector("img").alt;
      const ratingText = document.querySelector(`#output-${productId}`).innerText.split(":")[1]?.trim();
      const reviewText = document.querySelector(`#review${productId}`).value.trim();

      if (!ratingText) {
          isValid = false;
          message = `Please rate all products before submitting.`;
          return;
      }

      message += `${productName}:\n`;
      message += `- Rating: ${ratingText}\n`;
      message += `- Review: ${reviewText || "No review provided"}\n\n`;
  });

  if (!isValid) {
      alert(message);
      return;
  }
  alert(message);
  window.location.href = "index.html";
}