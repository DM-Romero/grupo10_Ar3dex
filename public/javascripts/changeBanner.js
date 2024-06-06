const inputChangeBanner = document.getElementById("bannerImage");
const imgBanner = document.getElementById("bannerImage-file");
const myModal = new bootstrap.Modal(document.getElementById('exampleModal'))

inputChangeBanner.addEventListener("change", async (e) => {
  const data = new FormData();
  data.append("file", inputChangeBanner.files[0]);

  const response = await fetch("/apis/change-banner", {

    method: "POST",
    body: data,
  });
  const result = await response.json()

  if(result) imgBanner.src = "/images/banners/" + result.file

  myModal.hide()

});
