// Austin Tobin FRH7486
// 635 Austin Tobin FRH7486 website1 JS
document.getElementById("location-btn").addEventListener('click', getLocation);

function getLocation() {
    // if getting geolocation is available
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert('Your browser or device does not support geolocation');
  }
}

function showPosition(position) {
    document.getElementById('lat').innerText = position.coords.latitude;
    document.getElementById('long').innerText = position.coords.longitude;

}