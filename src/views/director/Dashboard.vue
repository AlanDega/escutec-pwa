<template>
  <div>
    <v-col>
      <v-container>
        <v-row>
          <v-col cols="2">
            <Layout />
          </v-col>
          <v-col cols="10">
            <div class="chart">
              <Line  chart-data />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </div>
</template>

<script>
import Layout from "../director/layout/Layout";
import {Line} from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    labels: {
      type: Array,
      default: () => ['A', 'B', 'C']
    },
    datalabel: {
       type: String,
       default: 'Downloads per Week'
    },
    chartdata: {
	  type: Array,
      default: () => [100, 40, 106]
    }
  },
  components: {
    Layout
  },
  data() {
    return {
      gradient: null
    };
  },
  mounted () {
    this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)


    this.gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)')
    this.gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)');
    this.gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');



    this.renderChart({
      labels: this.labels,
      datasets: [
        {
          label: this.datalabel,
          borderColor: '#FC2525',
          pointBackgroundColor: 'white',
          borderWidth: 1,
          pointBorderColor: 'white',
          backgroundColor: this.gradient,
          data: this.chartdata
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})

  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL"],
        datasets: [{
            label: "Data",
            borderColor: "#80b6f4",
            pointBorderColor: "#80b6f4",
            pointBackgroundColor: "#80b6f4",
            pointHoverBackgroundColor: "#80b6f4",
            pointHoverBorderColor: "#80b6f4",
            pointBorderWidth: 10,
            pointHoverRadius: 10,
            pointHoverBorderWidth: 1,
            pointRadius: 3,
            fill: false,
            borderWidth: 4,
            data: [100, 120, 150, 170, 180, 170, 160]
        }]
    ,
    options: {
        legend: {
            position: "bottom"
        },
        scales: {
            yAxes: [{
                ticks: {
                    fontColor: "rgba(0,0,0,0.5)",
                    fontStyle: "bold",
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    padding: 20
                },
                gridLines: {
                    drawTicks: false,
                    display: false
                }
}],
            xAxes: [{
                gridLines: {
                    zeroLineColor: "transparent"
},
                ticks: {
                    padding: 20,
                    fontColor: "rgba(0,0,0,0.5)",
                    fontStyle: "bold"
                }
            }]
        }
    }
  }
    }
    }
    }  
</script>

<style lang="scss" scoped>
.chart{
width: 500px;
}
</style>