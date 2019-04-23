<!-- 报警设置页面板式 -->
<template>
    <el-container>
        <el-header>
            <el-row>
                <!-- (区域)过滤条件 -->
                <el-col :span="5">
                    <slot name="left-alarm"></slot> 
                </el-col>
                <!-- 添加 -->
                <el-col :span="2">
                    <slot name="middle-alarm"></slot>
                </el-col>
                <!-- 批量修改 -->
                <el-col :span="17">
                    <slot name="right-alarm"></slot>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
        <!-- 表格区 -->
        <slot></slot>
        </el-main>
    </el-container>
</template>

<script>
export default {
    
}
</script>

<style>

</style>


