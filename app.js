class StatsAggregator {
    constructor() {
        this.container = document.getElementById('stats-container');
        this.init();
    }

    async init() {
        try {
            await this.loadStats();
        } catch (error) {
            this.showError('Failed to load statistics');
        }
    }

    async loadStats() {
        const stats = [];
        
        try {
            // Census Bureau Population API
            const popResponse = await fetch('https://api.census.gov/data/2022/pep/population?get=POP_2022&for=us:*');
            const popData = await popResponse.json();
            stats.push({
                title: 'US Population (2022)',
                value: (parseInt(popData[1][0]) / 1000000).toFixed(1) + 'M',
                source: 'Census Bureau'
            });
        } catch (e) {
            stats.push({ title: 'US Population', value: 'N/A', source: 'Census Bureau' });
        }

        try {
            // Bureau of Labor Statistics Unemployment Rate
            const blsResponse = await fetch('https://api.bls.gov/publicAPI/v1/timeseries/data/LNS14000000?latest=true');
            const blsData = await blsResponse.json();
            const rate = blsData.Results.series[0].data[0].value;
            stats.push({
                title: 'Unemployment Rate',
                value: rate + '%',
                source: 'Bureau of Labor Statistics'
            });
        } catch (e) {
            stats.push({ title: 'Unemployment Rate', value: 'N/A', source: 'Bureau of Labor Statistics' });
        }

        try {
            // Federal Reserve Economic Data (FRED) GDP
            const fredResponse = await fetch('https://api.stlouisfed.org/fred/series/observations?series_id=GDP&api_key=demo&file_type=json&limit=1&sort_order=desc');
            const fredData = await fredResponse.json();
            const gdp = (parseFloat(fredData.observations[0].value) / 1000).toFixed(1);
            stats.push({
                title: 'GDP (Trillions)',
                value: '$' + gdp + 'T',
                source: 'Federal Reserve'
            });
        } catch (e) {
            stats.push({ title: 'GDP', value: 'N/A', source: 'Federal Reserve' });
        }

        this.renderStats(stats);
    }

    renderStats(stats) {
        const html = stats.map(stat => `
            <div class="stat-card">
                <div class="stat-title">${stat.title}</div>
                <div class="stat-value">${stat.value}</div>
                <div class="stat-source">Source: ${stat.source}</div>
            </div>
        `).join('');

        this.container.innerHTML = html;
    }

    showError(message) {
        this.container.innerHTML = `<div class="error">${message}</div>`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new StatsAggregator();
});