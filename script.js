// Add event listener to the form
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
        // Prevent form submission
        event.preventDefault();

        // Get form inputs
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        // Validate email
        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Validate password
        if (password.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }

        // If validation passes, submit the form
        form.submit();
    });

    const matchesContainer = document.getElementById("matches-container");

    // Fetch data from the API
    fetch("https://api.cricapi.com/v1/cricScore?apikey=14aeaf71-a41a-4ca2-9494-d5b25c171e40")
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data.data)) {
                data.data.forEach(match => {
                    const matchCard = document.createElement("div");
                    matchCard.classList.add("match-card");

                    matchCard.innerHTML = `
                        <div class="match-info">
                            <h3>${match.series}</h3>
                            <p><strong>${match.t1}</strong> vs <strong>${match.t2}</p>
                            <p>Type: ${match.matchType.toUpperCase()}</p>
                            <p>Status: ${match.status}</p>
                            <p>Date: ${new Date(match.dateTimeGMT).toLocaleString()}</p>
                        </div>
                        <div class="team-logos">
                            <img src="${match.t1img || ''}" alt="${match.t1}" />
                            <img src="${match.t2img || ''}" alt="${match.t2}" />
                        </div>
                    `;

                    matchesContainer.appendChild(matchCard);
                });
            } else {
                console.error("No match data available or unexpected structure:", data);
            }
        })
        .catch(error => console.error("Error fetching match data:", error));

    const videos = document.querySelectorAll(".video video");

    videos.forEach(video => {
        // Play video on hover (muted)
        video.addEventListener("mouseenter", () => {
            video.play();
        });

        // Pause video when mouse leaves
        video.addEventListener("mouseleave", () => {
            video.pause();
            video.currentTime = 0; // Reset to the beginning
        });

        // Play video with audio on click
        video.addEventListener("click", () => {
            if (video.muted) {
                video.muted = false; // Unmute the video
            }
            video.play(); // Play the video
        });
    });

    const slider = document.getElementById("slider");
    const leftArrow = document.getElementById("left-arrow");
    const rightArrow = document.getElementById("right-arrow");

    // Example match data (replace with API data if needed)
    const matchData = [
        {
            t1: "Gujarat Titans [GT]",
            t2: "Royal Challengers Bengaluru [RCB]",
            t1img: "https://g.cricapi.com/iapi/172-637852957798476823.png?w=48",
            t2img: "https://g.cricapi.com/iapi/21439-638468478038395955.jpg?w=48",
            status: "Match not started",
        },
        {
            t1: "New Zealand [NZ]",
            t2: "Pakistan [PAK]",
            t1img: "https://g.cricapi.com/iapi/57-637877076980737903.webp?w=48",
            t2img: "https://g.cricapi.com/iapi/66-637877075103236690.webp?w=48",
            status: "Match not started",
        },
        {
            t1: "Chennai Super Kings [CSK]",
            t2: "Mumbai Indians [MI]",
            t1img: "https://g.cricapi.com/iapi/135-637852956181378533.png?w=48",
            t2img: "https://g.cricapi.com/iapi/226-637852956375593901.png?w=48",
            status: "Match not started",
        },
        {
            t1: "Delhi Capitals [DC]",
            t2: "Sunrisers Hyderabad [SRH]",
            t1img: "https://g.cricapi.com/iapi/148-637874596301457910.png?w=48",
            t2img: "https://g.cricapi.com/iapi/279-637852957609490368.png?w=48",
            status: "Match not started",
        },
    ];

    // Populate match data into the slider
    matchData.forEach(match => {
        const matchCard = document.createElement("div");
        matchCard.classList.add("match-card");

        matchCard.innerHTML = `
            <img src="${match.t1img}" alt="${match.t1}">
            <h3>${match.t1} vs ${match.t2}</h3>
            <p>Status: ${match.status}</p>
        `;

        slider.appendChild(matchCard);
    });

    // Sliding functionality
    leftArrow.addEventListener("click", () => {
        slider.scrollLeft -= 300;
    });

    rightArrow.addEventListener("click", () => {
        slider.scrollLeft += 300;
    });
});

// Function to validate email format
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
