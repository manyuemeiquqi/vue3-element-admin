import ChartComponent from '@/components/chart-component'
import useChartOption from '@/hooks/chartOption'
import useLoading from '@/hooks/loading'
import { Card, Spin } from '@arco-design/web-vue'
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    const { loading } = useLoading()
    const { chartOption } = useChartOption((isDark) => {
      // echarts support https://echarts.apache.org/zh/theme-builder.html
      // It's not used here
      return {
        legend: {
          left: 'center',
          data: ['纯文本', '图文类', '视频类'],
          bottom: 0,
          icon: 'circle',
          itemWidth: 8,
          textStyle: {
            color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#4E5969'
          },
          itemStyle: {
            borderWidth: 0
          }
        },
        tooltip: {
          show: true,
          trigger: 'item'
        },
        graphic: {
          elements: [
            {
              type: 'text',
              left: 'center',
              top: '40%',
              style: {
                text: '内容量',
                textAlign: 'center',
                fill: isDark ? '#ffffffb3' : '#4E5969',
                fontSize: 14
              }
            },
            {
              type: 'text',
              left: 'center',
              top: '50%',
              style: {
                text: '928,531',
                textAlign: 'center',
                fill: isDark ? '#ffffffb3' : '#1D2129',
                fontSize: 16,
                fontWeight: 500
              }
            }
          ]
        },
        series: [
          {
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['50%', '50%'],
            label: {
              formatter: '{d}%',
              fontSize: 14,
              color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#4E5969'
            },
            itemStyle: {
              borderColor: isDark ? '#232324' : '#fff',
              borderWidth: 1
            },
            data: [
              {
                value: [148564],
                name: '纯文本',
                itemStyle: {
                  color: isDark ? '#3D72F6' : '#249EFF'
                }
              },
              {
                value: [334271],
                name: '图文类',
                itemStyle: {
                  color: isDark ? '#A079DC' : '#313CA9'
                }
              },
              {
                value: [445694],
                name: '视频类',
                itemStyle: {
                  color: isDark ? '#6CAAF5' : '#21CCFF'
                }
              }
            ]
          }
        ]
      }
    })
    return () => (
      <Spin>
        <Card>
          <ChartComponent options={chartOption.value} />
        </Card>
      </Spin>
    )
  }
})
