    async function checkVPNAndStartTimer() {
      const countdownEl = document.getElementById('countdownMessage');
      const claimBtn = document.getElementById('claimBtn');
      const claimedmsg = document.getElementById('Claimed-Message');
      const claimedinput = document.getElementById('walletAddress');
      const usercheck = document.getElementById('user-check');
      const faucetArea = document.getElementById('faucet-area');

      try {
        // Step 1: Get user's IP address
        const ipRes = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipRes.json();
        const ip = ipData.ip;

        // Step 2: Check for VPN/Proxy
        const proxyRes = await fetch(`https://proxycheck.io/v2/${ip}?vpn=1&asn=1`);
        const proxyData = await proxyRes.json();

        if (proxyData.status === "ok" && proxyData[ip]) {
          const isProxy = proxyData[ip].proxy === "yes";
          const type = proxyData[ip].type;

          if (isProxy && (type === "VPN" || type === "Proxy")) {
            // VPN/Proxy detected
            usercheck.textContent = "VPN or Proxy detected! You are not allowed to continue.";
            usercheck.style.color = "red";
            usercheck.style.fontWeight = "bold";
            usercheck.style.fontSize = "larger";
            usercheck.style.backgroundColor = "rgba(255, 0, 0, 0.1)";
            faucetArea.style.display = "none"; // Hide faucet content
            return;
          } else {
            // No VPN/Proxy, show message and start timer
            usercheck.textContent = "You're good! No VPN/Proxy detected.";
            usercheck.style.color = "green";
            usercheck.style.fontWeight = "bold";
            usercheck.style.fontSize = "larger";
            usercheck.style.backgroundColor = "rgba(91, 239, 91, 0.123)";
          }
        }

        // ✅ Start countdown
        let secondsLeft = 15;
        countdownEl.textContent = `Please wait ${secondsLeft} seconds to claim...`;
        const countdownInterval = setInterval(() => {
          secondsLeft--;
          countdownEl.textContent = `Please wait ${secondsLeft} second${secondsLeft !== 1 ? 's' : ''} to claim...`;
          if (secondsLeft <= 0) {
            clearInterval(countdownInterval);
            countdownEl.textContent = '';
            claimBtn.style.display = 'inline-block';
          }
        }, 1000);
      } catch (err) {
        console.error("Error checking IP:", err);
        countdownEl.textContent = "Unable to verify your connection. Please try again later.";
      }
    }

    function claimReward() {
      const walletAddress = document.getElementById('walletAddress').value;
      const claimBtn = document.getElementById('claimBtn');
      const claimedmsg = document.getElementById('Claimed-Message');
      const claimedinput = document.getElementById('walletAddress');

      if (!walletAddress) {
        alert('Please enter your wallet address.');
        return;
      }

      claimBtn.style.display = 'none';
      claimedmsg.style.display = 'inline-block';
      claimedinput.style.display = 'none';
      alert(`Reward claimed for ${walletAddress}!`);
    }

    window.addEventListener('load', checkVPNAndStartTimer);
