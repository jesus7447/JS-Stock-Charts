async function main() {
    let response =  await fetch('https://api.twelvedata.com/time_series?apikey=5f4f16d209864a08b4d4f6da81293abe&interval=1day&symbol=GME,MSFT,DIS,BNTX&outputsize=1')

    let responseText = await response.text()
    console.log(responseText)

    const {GME, MSFT, DIS, BNTX} = mockData;

    const stocks = [GME, MSFT, DIS, BNTX]



    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');


    function getColor(stock){
        if(stock === "GME"){
            return 'rgba(61, 161, 61, 0.7)'
        }
        if(stock === "MSFT"){
            return 'rgba(209, 4, 25, 0.7)'
        }
        if(stock === "DIS"){
            return 'rgba(18, 4, 209, 0.7)'
        }
        if(stock === "BNTX"){
            return 'rgba(166, 43, 158, 0.7)'
        }
    }

    function highestStock(stock){
        const high = [mockData.values]
        const largest = 0

        for (let i = 0; i < mockData.values.length; i++) {
            if (mockData.values[i] > largest){
                largest = mockData.values[i]
            }
            
        }
        console.log(largest)

    }


    stocks.forEach(stock => stock.values.reverse())
    

    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map( stock => ({
                label: stock.meta.symbol,
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor:  getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
            }))
        }
    });

    new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: stocks[0].meta.map(value => value.meta),
            datasets: stocks.map( stock => ({
                data:stock.meta.map(value => parseFloat(value.high))
            }))
        }
    });
                                                  

}

main()