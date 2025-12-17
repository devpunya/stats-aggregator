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
        // Simulate API call - replace with actual government API endpoints
        const mockStats = [
            { title: 'Population', value: '331.9M', source: 'Census Bureau' },
            { title: 'GDP Growth', value: '2.1%', source: 'Bureau of Economic Analysis' },
            { title: 'Unemployment Rate', value: '3.7%', source: 'Bureau of Labor Statistics' }
        ];

        setTimeout(() => {
            this.renderStats(mockStats);
        }, 1000);
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