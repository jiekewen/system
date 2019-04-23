<!-- 消息列表页面板式 -->
<template>
    <el-container>
        <el-header>
            <el-row>
                <!-- (区域)过滤条件 -->
                <!-- <el-col :span="6">
                    <slot name="left-filter"></slot> 
                </el-col> -->
                <!-- (类别)过滤条件 -->
                <el-col :span="6">
                    <slot name="middle-filter"></slot>
                </el-col>
                <!-- (日期)过滤条件 -->
                <el-col :span="18">
                    <slot name="right-filter"></slot>
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


