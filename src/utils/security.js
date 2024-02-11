async function toSHA256(message) {
  const buffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
	return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
}

							// Example usage
					/*const message = 'Hello, world!';
					sha256(message).then(hash => {
					  console.log('SHA-256 hash:', hash);
					});*/
