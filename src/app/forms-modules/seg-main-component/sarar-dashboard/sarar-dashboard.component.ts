// combined-dashboard.component.ts
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, ChartConfiguration, ChartType } from 'chart.js';
import { registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-sarar-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sarar-dashboard.component.html',
  styleUrls: ['./sarar-dashboard.component.css']
})
export class CombinedDashboardComponent implements OnInit {
  @ViewChild('segJobStatusChart') segJobStatusChart!: ElementRef;
  @ViewChild('segMmdHealthChart') segMmdHealthChart!: ElementRef;
  @ViewChild('segRequestSourceChart') segRequestSourceChart!: ElementRef;
  @ViewChild('segToolUsageChart') segToolUsageChart!: ElementRef;
  @ViewChild('segTurnaroundTimeChart') segTurnaroundTimeChart!: ElementRef;
  
  @ViewChild('hituInspectionStatusChart') hituInspectionStatusChart!: ElementRef;
  @ViewChild('hituTrialFrequencyChart') hituTrialFrequencyChart!: ElementRef;
  @ViewChild('hituTurnaroundTimeChart') hituTurnaroundTimeChart!: ElementRef;
  @ViewChild('hituDeficiencyTrendsChart') hituDeficiencyTrendsChart!: ElementRef;
  @ViewChild('hituApprovalFlowChart') hituApprovalFlowChart!: ElementRef;
  @ViewChild('hituInspectionLoadChart') hituInspectionLoadChart!: ElementRef;

  activeTab = 'SEG';
  tabs = ['SEG', 'HITU'];
  
  currentDate = new Date().toLocaleDateString('en-US', { 
    day: '2-digit', 
    month: 'short', 
    year: '2-digit' 
  }).toUpperCase();

  // SEG Data
  segOperationalOverview = {
    activeRequests: 47,
    completedJobs: 128,
    avgRestorationTime: '2.3 days',
    diskHealth: '92% Optimal'
  };

  segJobStatusData = {
    labels: ['In Progress', 'Accepted', 'Completed', 'Closed'],
    data: [25, 18, 65, 20],
    colors: [
      'rgba(59, 130, 246, 0.8)',
      'rgba(16, 185, 129, 0.8)',
      'rgba(245, 158, 11, 0.8)',
      'rgba(139, 92, 246, 0.8)'
    ]
  };

  segMmdHealthData = {
    labels: ['Safe', 'Likely to Fail', 'Fail'],
    data: [85, 12, 3],
    colors: [
      'rgba(34, 197, 94, 0.8)',
      'rgba(245, 158, 11, 0.8)',
      'rgba(239, 68, 68, 0.8)'
    ]
  };

  segRequestSourceData = {
    labels: ['INS Mumbai', 'INS Delhi', 'INS Kolkata', 'INS Chennai', 'INS Shivalik', 'Other'],
    data: [28, 22, 19, 15, 12, 24]
  };

  segToolUsageData = {
    labels: ['Cloning', 'Imaging', 'Data Recovery', 'Forensic Analysis', 'Hardware Repair'],
    data: [45, 38, 29, 22, 18]
  };

  segTurnaroundTimeData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    data: [3.2, 2.8, 2.5, 2.1, 1.9, 2.3]
  };

  segAdditionalInsights = {
    feedbackRatings: {
      success: 94,
      notSuccess: 6
    },
    pendingCollections: 8,
    topRequestTypes: ['Data Recovery', 'System Imaging', 'Hardware Diagnostics']
  };

  // HITU Data
  hituTrialActivity = {
    pendingRequisitions: 15,
    trialsInProgress: 8,
    preliminaryTrials: 3,
    intermediateTrials: 2,
    finalTrials: 3,
    completedReports: 42
  };

  hituInspectionStatusData = {
    labels: ['Pending', 'In Progress', 'Completed'],
    data: [15, 8, 42],
    colors: [
      'rgba(245, 158, 11, 0.8)',
      'rgba(59, 130, 246, 0.8)',
      'rgba(34, 197, 94, 0.8)'
    ]
  };

  hituTrialFrequencyData = {
    labels: ['Preliminary', 'Intermediate', 'Final', 'U/W Compartment'],
    data: [25, 18, 32, 12]
  };

  hituTurnaroundTimeData = {
    labels: ['Preliminary', 'Intermediate', 'Final', 'U/W Compartment'],
    data: [2.1, 3.4, 4.2, 1.8]
  };

  hituDeficiencyTrendsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Minor Deficiencies',
        data: [12, 15, 8, 10, 14, 9],
        backgroundColor: 'rgba(245, 158, 11, 0.8)'
      },
      {
        label: 'Major Deficiencies',
        data: [3, 5, 2, 4, 6, 3],
        backgroundColor: 'rgba(239, 68, 68, 0.8)'
      }
    ]
  };

  hituApprovalFlowData = {
    labels: ['Ship Request', 'Unit Review', 'Inspection', 'Report Prep', 'Final Approval'],
    data: [1.2, 2.1, 3.5, 1.8, 0.9]
  };

  hituInspectionLoadData = {
    labels: ['INS Mumbai', 'INS Delhi', 'INS Kolkata', 'INS Chennai', 'INS Shivalik'],
    data: [8, 6, 5, 4, 3]
  };

  hituAdditionalInsights = {
    overdueInspections: [
      'INS Ranvir - Hull Inspection',
      'INS Betwa - U/W Compartment',
      'INS Gomati - Final Trial'
    ],
    avgInspectionDurations: {
      'INS Mumbai': '3.2 days',
      'INS Delhi': '2.8 days',
      'INS Kolkata': '3.5 days',
      'INS Chennai': '2.9 days'
    }
  };

  charts: { [key: string]: Chart } = {};

  ngOnInit() {
    setTimeout(() => {
      this.initializeCharts();
    }, 300);
  }

  onTabChange(tab: string) {
    this.activeTab = tab;
    setTimeout(() => {
      this.initializeCharts();
    }, 100);
  }

  initializeCharts() {
    if (this.activeTab === 'SEG') {
      this.initializeSEGCharts();
    } else {
      this.initializeHITUCharts();
    }
  }

  initializeSEGCharts() {
    this.createSEGJobStatusChart();
    this.createSEGMmdHealthChart();
    this.createSEGRequestSourceChart();
    this.createSEGToolUsageChart();
    this.createSEGTurnaroundTimeChart();
  }

  initializeHITUCharts() {
    this.createHITUInspectionStatusChart();
    this.createHITUTrialFrequencyChart();
    this.createHITUTurnaroundTimeChart();
    this.createHITUDeficiencyTrendsChart();
    this.createHITUApprovalFlowChart();
    this.createHITUInspectionLoadChart();
  }

  // SEG Chart Methods
  createSEGJobStatusChart() {
    if (this.charts['segJobStatus']) {
      this.charts['segJobStatus'].destroy();
    }
    
    const ctx = this.segJobStatusChart.nativeElement.getContext('2d');
    this.charts['segJobStatus'] = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.segJobStatusData.labels,
        datasets: [{
          data: this.segJobStatusData.data,
          backgroundColor: this.segJobStatusData.colors,
          borderWidth: 2,
          borderColor: '#fff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'JOB STATUS BREAKDOWN',
            font: { size: 16, weight: 'bold' }
          },
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
              padding: 20
            }
          }
        }
      }
    });
  }

  createSEGMmdHealthChart() {
    if (this.charts['segMmdHealth']) {
      this.charts['segMmdHealth'].destroy();
    }
    
    const ctx = this.segMmdHealthChart.nativeElement.getContext('2d');
    this.charts['segMmdHealth'] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.segMmdHealthData.labels,
        datasets: [{
          label: 'Drive Count',
          data: this.segMmdHealthData.data,
          backgroundColor: this.segMmdHealthData.colors,
          borderColor: this.segMmdHealthData.colors.map(color => color.replace('0.8', '1')),
          borderWidth: 2,
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'MMD HEALTH PREDICTION',
            font: { size: 16, weight: 'bold' }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Drives'
            }
          }
        }
      }
    });
  }

  createSEGRequestSourceChart() {
    if (this.charts['segRequestSource']) {
      this.charts['segRequestSource'].destroy();
    }
    
    const ctx = this.segRequestSourceChart.nativeElement.getContext('2d');
    this.charts['segRequestSource'] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.segRequestSourceData.labels,
        datasets: [{
          label: 'Requests',
          data: this.segRequestSourceData.data,
          backgroundColor: 'rgba(59, 130, 246, 0.8)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 2,
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'REQUEST SOURCE ANALYSIS',
            font: { size: 16, weight: 'bold' }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Requests'
            }
          }
        }
      }
    });
  }

  createSEGToolUsageChart() {
    if (this.charts['segToolUsage']) {
      this.charts['segToolUsage'].destroy();
    }
    
    const ctx = this.segToolUsageChart.nativeElement.getContext('2d');
    this.charts['segToolUsage'] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.segToolUsageData.labels,
        datasets: [{
          label: 'Usage Count',
          data: this.segToolUsageData.data,
          backgroundColor: 'rgba(139, 92, 246, 0.8)',
          borderColor: 'rgba(139, 92, 246, 1)',
          borderWidth: 2,
          borderRadius: 8
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'TOOL USAGE FREQUENCY',
            font: { size: 16, weight: 'bold' }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Usage Count'
            }
          }
        }
      }
    });
  }

  createSEGTurnaroundTimeChart() {
    if (this.charts['segTurnaroundTime']) {
      this.charts['segTurnaroundTime'].destroy();
    }
    
    const ctx = this.segTurnaroundTimeChart.nativeElement.getContext('2d');
    this.charts['segTurnaroundTime'] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.segTurnaroundTimeData.labels,
        datasets: [{
          label: 'Average Turnaround Time (Days)',
          data: this.segTurnaroundTimeData.data,
          backgroundColor: 'rgba(34, 197, 94, 0.2)',
          borderColor: 'rgba(34, 197, 94, 1)',
          borderWidth: 3,
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'TURNAROUND TIME TREND',
            font: { size: 16, weight: 'bold' }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Days'
            }
          }
        }
      }
    });
  }

  // HITU Chart Methods
  createHITUInspectionStatusChart() {
    if (this.charts['hituInspectionStatus']) {
      this.charts['hituInspectionStatus'].destroy();
    }
    
    const ctx = this.hituInspectionStatusChart.nativeElement.getContext('2d');
    this.charts['hituInspectionStatus'] = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.hituInspectionStatusData.labels,
        datasets: [{
          data: this.hituInspectionStatusData.data,
          backgroundColor: this.hituInspectionStatusData.colors,
          borderWidth: 2,
          borderColor: '#fff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'INSPECTION STATUS DISTRIBUTION',
            font: { size: 16, weight: 'bold' }
          },
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
              padding: 20
            }
          }
        }
      }
    });
  }

  createHITUTrialFrequencyChart() {
    if (this.charts['hituTrialFrequency']) {
      this.charts['hituTrialFrequency'].destroy();
    }
    
    const ctx = this.hituTrialFrequencyChart.nativeElement.getContext('2d');
    this.charts['hituTrialFrequency'] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.hituTrialFrequencyData.labels,
        datasets: [{
          label: 'Number of Trials',
          data: this.hituTrialFrequencyData.data,
          backgroundColor: 'rgba(59, 130, 246, 0.8)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 2,
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'TRIAL FREQUENCY BY TYPE',
            font: { size: 16, weight: 'bold' }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Trials'
            }
          }
        }
      }
    });
  }

  createHITUTurnaroundTimeChart() {
    if (this.charts['hituTurnaroundTime']) {
      this.charts['hituTurnaroundTime'].destroy();
    }
    
    const ctx = this.hituTurnaroundTimeChart.nativeElement.getContext('2d');
    this.charts['hituTurnaroundTime'] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.hituTurnaroundTimeData.labels,
        datasets: [{
          label: 'Average Time (Days)',
          data: this.hituTurnaroundTimeData.data,
          backgroundColor: 'rgba(34, 197, 94, 0.8)',
          borderColor: 'rgba(34, 197, 94, 1)',
          borderWidth: 2,
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'TURNAROUND TIME PER INSPECTION TYPE',
            font: { size: 16, weight: 'bold' }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Days'
            }
          }
        }
      }
    });
  }

  createHITUDeficiencyTrendsChart() {
    if (this.charts['hituDeficiencyTrends']) {
      this.charts['hituDeficiencyTrends'].destroy();
    }
    
    const ctx = this.hituDeficiencyTrendsChart.nativeElement.getContext('2d');
    this.charts['hituDeficiencyTrends'] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.hituDeficiencyTrendsData.labels,
        datasets: this.hituDeficiencyTrendsData.datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'DEFICIENCY TRENDS',
            font: { size: 16, weight: 'bold' }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Deficiencies'
            }
          }
        }
      }
    });
  }

  createHITUApprovalFlowChart() {
    if (this.charts['hituApprovalFlow']) {
      this.charts['hituApprovalFlow'].destroy();
    }
    
    const ctx = this.hituApprovalFlowChart.nativeElement.getContext('2d');
    this.charts['hituApprovalFlow'] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.hituApprovalFlowData.labels,
        datasets: [{
          label: 'Time (Days)',
          data: this.hituApprovalFlowData.data,
          backgroundColor: 'rgba(168, 85, 247, 0.8)',
          borderColor: 'rgba(168, 85, 247, 1)',
          borderWidth: 2,
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'APPROVAL FLOW DURATION',
            font: { size: 16, weight: 'bold' }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Days'
            }
          }
        }
      }
    });
  }

  createHITUInspectionLoadChart() {
    if (this.charts['hituInspectionLoad']) {
      this.charts['hituInspectionLoad'].destroy();
    }
    
    const ctx = this.hituInspectionLoadChart.nativeElement.getContext('2d');
    this.charts['hituInspectionLoad'] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.hituInspectionLoadData.labels,
        datasets: [{
          label: 'Number of Inspections',
          data: this.hituInspectionLoadData.data,
          backgroundColor: 'rgba(245, 158, 11, 0.8)',
          borderColor: 'rgba(245, 158, 11, 1)',
          borderWidth: 2,
          borderRadius: 8
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'INSPECTION LOAD BY SHIP',
            font: { size: 16, weight: 'bold' }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Inspections'
            }
          }
        }
      }
    });
  }
}