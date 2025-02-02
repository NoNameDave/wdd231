document.addEventListener("DOMContentLoaded", () => {
    // Fill timestamp field with the current date and time
    document.getElementById("timestamp").value = new Date().toISOString();

    // Fade-in animation for membership cards
    const membershipCards = document.querySelectorAll(".card");
    membershipCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add("visible");
        }, index * 300); // Staggered animation
    });

    // Modal functionality
    const modals = document.querySelectorAll(".modal");
    const openButtons = document.querySelectorAll(".open-modal");
    const closeButtons = document.querySelectorAll(".close-modal");

    openButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            modals[index].classList.add("active");
        });
    });

    closeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            button.closest(".modal").classList.remove("active");
        });
    });

    // Close modal when clicking outside of content
    modals.forEach((modal) => {
        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.classList.remove("active");
            }
        });
    });
});
