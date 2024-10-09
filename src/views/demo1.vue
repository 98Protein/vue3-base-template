<template>
  <div class="dashboard-container">
    <!-- 第一层：输入框和按钮部分，两行 -->
    <el-row :gutter="20" class="input-section">
      <el-col :span="6">
        <el-input placeholder="输入框 1"></el-input>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="输入框 2"></el-input>
      </el-col>
      <el-col :span="6">
        <el-select placeholder="选择框">
          <el-option label="选项 1" value="1"></el-option>
          <el-option label="选项 2" value="2"></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-button type="primary">查询</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="input-section">
      <el-col :span="6">
        <el-input placeholder="输入框 3"></el-input>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="输入框 4"></el-input>
      </el-col>
      <el-col :span="6">
        <el-select placeholder="选择框">
          <el-option label="选项 3" value="3"></el-option>
          <el-option label="选项 4" value="4"></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-button type="primary">查询</el-button>
      </el-col>
    </el-row>

    <!-- 第二层：三个图表 -->
    <el-row :gutter="20" class="charts-section" style="margin-top: 30px;">
      <el-col :span="8">
        <div ref="lineChart" style="height: 400px;"></div>
      </el-col>
      <el-col :span="8">
        <div ref="barChart1" style="height: 400px;"></div>
      </el-col>
      <el-col :span="8">
        <div ref="barChart2" style="height: 400px;"></div>
      </el-col>
    </el-row>

    <!-- 第三层：历史列表，支持搜索和导出 -->
    <el-row :gutter="20" style="margin-top: 30px;">
      <el-col :span="24">
        <el-input placeholder="搜索历史记录" v-model="searchQuery" style="width: 300px; margin-bottom: 10px;"></el-input>
        <el-button type="primary" @click="exportData">导出</el-button>
      </el-col>
    </el-row>
    <el-table :data="filteredTableData" border style="width: 100%; margin-top: 10px;" @row-click="handleRowClick">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="名称" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import * as echarts from 'echarts';
import { ref, onMounted, computed } from 'vue';

const lineChart = ref(null);
const barChart1 = ref(null);
const barChart2 = ref(null);
const searchQuery = ref('');

const tableData = [
  { date: '2024-10-01', name: '记录 1', address: '某个地方 1' },
  { date: '2024-10-02', name: '记录 2', address: '某个地方 2' },
  { date: '2024-10-03', name: '记录 3', address: '某个地方 3' },
];

const filteredTableData = computed(() => {
  return tableData.filter(item =>
    item.name.includes(searchQuery.value) ||
    item.address.includes(searchQuery.value)
  );
});

const initCharts = () => {
  if (lineChart.value) {
    const lineInstance = echarts.init(lineChart.value);
    lineInstance.setOption({
      title: {
        text: '折线图示例',
      },
      xAxis: {
        type: 'category',
        data: ['一月', '二月', '三月', '四月', '五月'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [150, 230, 224, 218, 135],
          type: 'line',
        },
      ],
    });
  }

  if (barChart1.value) {
    const barInstance1 = echarts.init(barChart1.value);
    barInstance1.setOption({
      title: {
        text: '柱状图示例 1',
      },
      xAxis: {
        type: 'category',
        data: ['产品 A', '产品 B', '产品 C', '产品 D'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [320, 332, 301, 334],
          type: 'bar',
        },
      ],
    });
  }

  if (barChart2.value) {
    const barInstance2 = echarts.init(barChart2.value);
    barInstance2.setOption({
      title: {
        text: '柱状图示例 2',
      },
      xAxis: {
        type: 'category',
        data: ['类别 X', '类别 Y', '类别 Z'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [200, 182, 191],
          type: 'bar',
        },
      ],
    });
  }
};

const handleRowClick = (row) => {
  // 当选中表格某一行时，动态更新图表数据
  console.log('选中行数据:', row);
  // 这里可以根据选中行的数据来更新图表
  // 示例：可以使用不同的数据更新折线图或柱状图
};

const exportData = () => {
  console.log('导出数据');
  // 在这里实现导出逻辑
};

onMounted(() => {
  initCharts();
});
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
}
.input-section {
  margin-bottom: 20px;
}
</style>
