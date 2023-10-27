async function searchCovidData() {
  const countryInput = document.getElementById("countryInput");
  const country = countryInput.value;

  if (!country) {
    alert("Please enter a country name.");
    return;
  }

  const url = `https://covid-193.p.rapidapi.com/statistics?country=${country}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "94ba310575msh8f90f1b1b9fd924p12d82ejsn957c2a264264",
      "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (data.results === 0) {
      alert("Country not found or no data available.");
      return;
    }

    const statistics = data.response[0];

    // Format angka dengan toLocaleString('id-ID')
    const formattedActiveCases = statistics.cases.active
      ? statistics.cases.active.toLocaleString("id-ID")
      : "N/A";
    const formattedNewCases = statistics.cases.new
      ? statistics.cases.new.toLocaleString("id-ID")
      : "N/A";
    const formattedRecoveredCases = statistics.cases.recovered
      ? statistics.cases.recovered.toLocaleString("id-ID")
      : "N/A";
    const formattedTotalCases = statistics.cases.total
      ? statistics.cases.total.toLocaleString("id-ID")
      : "N/A";
    const formattedTotalDeaths = statistics.deaths.total
      ? statistics.deaths.total.toLocaleString("id-ID")
      : "N/A";
    const formattedTotalTests = statistics.tests.total
      ? statistics.tests.total.toLocaleString("id-ID")
      : "N/A";

    // Tampilkan data yang sudah diformat
    document.getElementById("activeCases").textContent = formattedActiveCases;
    document.getElementById("newCases").textContent = formattedNewCases;
    document.getElementById("recoveredCases").textContent =
      formattedRecoveredCases;
    document.getElementById("totalCases").textContent = formattedTotalCases;
    document.getElementById("totalDeaths").textContent = formattedTotalDeaths;
    document.getElementById("totalTests").textContent = formattedTotalTests;
  } catch (error) {
    console.error(error);
  }
}
