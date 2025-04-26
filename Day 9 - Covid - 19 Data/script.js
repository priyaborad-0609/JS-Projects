async function loadCovidData() {
    try {
      const response = await fetch("https://api.rootnet.in/covid19-in/stats/latest");
      const result = await response.json();
      const data = result.data.regional;

      const tableBody = document.getElementById("covidTableBody");
      tableBody.innerHTML = "";

      data.forEach((state, index) => {
        const row = `
          <tr>
            <td>${index + 1}</td>
            <td>${state.loc}</td>
            <td>${state.confirmedCasesIndian}</td>
            <td>${state.confirmedCasesForeign}</td>
            <td>${state.discharged}</td>
            <td>${state.deaths}</td>
            <td>${state.totalConfirmed}</td>
          </tr>
        `;
        tableBody.innerHTML += row;
      });
    } catch (error) {
      console.error("Failed to load data:", error);
    }
  }

  // Load data on page load
  loadCovidData();