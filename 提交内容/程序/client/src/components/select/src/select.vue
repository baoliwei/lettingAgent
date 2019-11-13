<template>
   <div
    class="el-select"
    :class="[selectSize ? 'el-select--' + selectSize : '']"
    @click.stop="toggleMenu"
    v-clickoutside="handleClose">
    <div
      class="el-select__tags"
      v-if="multiple"
      ref="tags"
      :style="{ 'max-width': inputWidth - 32 + 'px' }">
      <span v-if="collapseTags && selected.length">
        <el-tag
          :closable="!selectDisabled"
          :size="collapseTagSize"
          :hit="selected[0].hitState"
          type="info"
          @close="deleteTag($event, selected[0])"
          disable-transitions>
          <span class="el-select__tags-text">{{ selected[0].currentLabel }}</span>
        </el-tag>
        <el-tag
          v-if="selected.length > 1"
          :closable="false"
          :size="collapseTagSize"
          type="info"
          disable-transitions>
          <span class="el-select__tags-text">+ {{ selected.length - 1 }}</span>
        </el-tag>
      </span>
      <transition-group @after-leave="resetInputHeight" v-if="!collapseTags">
        <el-tag
          v-for="item in selected"
          :key="getValueKey(item)"
          :closable="!selectDisabled"
          :size="collapseTagSize"
          :hit="item.hitState"
          type="info"
          @close="deleteTag($event, item)"
          disable-transitions>
          <span class="el-select__tags-text">{{ item.currentLabel }}</span>
        </el-tag>
      </transition-group>

      <input
        type="text"
        class="el-select__input"
        :class="[selectSize ? `is-${ selectSize }` : '']"
        :disabled="selectDisabled"
        :autocomplete="autoComplete"
        @focus="handleFocus"
        @blur="softFocus = false"
        @click.stop
        @keyup="managePlaceholder"
        @keydown="resetInputState"
        @keydown.down.prevent="navigateOptions('next')"
        @keydown.up.prevent="navigateOptions('prev')"
        @keydown.enter.prevent="selectOption"
        @keydown.esc.stop.prevent="visible = false"
        @keydown.delete="deletePrevTag"
        @compositionstart="handleComposition"
        @compositionupdate="handleComposition"
        @compositionend="handleComposition"
        v-model="query"
        @input="e => handleQueryChange(e.target.value)"
        :debounce="remote ? 300 : 0"
        v-if="filterable"
        :style="{ width: inputLength + 'px', 'max-width': inputWidth - 42 + 'px' }"
        ref="input">
    </div>
    <el-input
      ref="reference"
      v-model="selectedLabel"
      type="text"
      :placeholder="currentPlaceholder"
      :name="name"
      :id="id"
      :auto-complete="autoComplete"
      :size="selectSize"
      :disabled="selectDisabled"
      :readonly="readonly"
      :validate-event="false"
      :class="{ 'is-focus': visible }"
      @focus="handleFocus"
      @blur="handleBlur"
      @keyup.native="debouncedOnInputChange"
      @keydown.native.down.stop.prevent="navigateOptions('next')"
      @keydown.native.up.stop.prevent="navigateOptions('prev')"
      @keydown.native.enter.prevent="selectOption"
      @keydown.native.esc.stop.prevent="visible = false"
      @keydown.native.tab="visible = false"
      @paste.native="debouncedOnInputChange"
      @mouseenter.native="inputHovering = true"
      @mouseleave.native="inputHovering = false">
      <template slot="prefix" v-if="$slots.prefix">
        <slot name="prefix"></slot>
      </template>
      <i slot="suffix"
       :class="['el-select__caret', 'el-input__icon', 'el-icon-' + iconClass]"
       @click="handleIconClick"
      ></i>
    </el-input>
    <transition
      name="el-zoom-in-top"
      @before-enter="handleMenuEnter"
      @after-leave="doDestroy">
      <el-select-menu
        ref="popper"
        :append-to-body="popperAppendToBody"
        v-show="visible && emptyText !== false">
        <el-button-group v-if="multiple" class="rc-select-menu__buttons">
          <el-button size="mini" @click="onSelectAll">全选</el-button>
          <el-button size="mini" @click="onCancelSelectAll" style="padding: 0 5px;">取消全选</el-button>
        </el-button-group>
        <el-scrollbar
          tag="ul"
          wrap-class="el-select-dropdown__wrap"
          view-class="el-select-dropdown__list"
          ref="scrollbar"
          :class="{ 'is-empty': !allowCreate && query && filteredOptionsCount === 0 }"
          v-show="options.length > 0 && !loading">
          <el-option
            :value="query"
            created
            v-if="showNewOption">
          </el-option>
          <!-- 犯懒把特定数据的动态渲染 移植到select 内部 -->
          <el-option
            v-if="rcOptions.length > 0"
            v-for="(item, index) in rcOptions"
            :key="'rcOptions' + index"
            :label="item.label"
            :value="item.value">
          </el-option>
          <slot></slot>
        </el-scrollbar>
        <p
          class="el-select-dropdown__empty"
          v-if="emptyText &&
            (!allowCreate || loading || (allowCreate && options.length === 0 ))">
          {{ emptyText }}
        </p>
      </el-select-menu>
    </transition>
  </div>
</template>
<script>
import { Select } from 'element-ui'
import { objectToArray } from '@/utils/util'
import Format from '@/locale/format'
const format = Format()
export default {
  name: 'rc-select',
  mixins: [ Select ],
  props: {
    multipleSelectedText: {
      type: String,
      default: '已选中 {length}个选项'
    },
    // 使用数据渲染的方式
    rcData: {
      type: Object
    }
  },
  computed: {
    multipleText () {
      const selected = this.selected
      if (!selected || !selected.length) return ''
      const length = selected.length
      return format(this.multipleSelectedText, { length: length })
    },
    // 使用数据渲染的方式渲染 状态列表
    rcOptions () {
      return objectToArray(this.rcData)
    }
  },
  methods: {
    // 全选
    onSelectAll () {
      if (!this.multiple) {
        return
      }
      let value = this.options.map(item => item.value)
      this.$emit('input', value)
    },
    // 取消全选
    onCancelSelectAll () {
      this.$emit('input', [])
    }
  }
}
</script>
<style lang="scss">
@import 'scss/variables';
@import "~@rrc/scss/src/mixins/mixin";

@include b(select-menu) {
  @include e(buttons) {
    padding: 8px 20px 4px 20px;
    display: flex;
    justify-content: center;

    .el-button {
      width: 50%;
    }

    .el-button--small {
      padding: 9px 10px;
    }
  }
}

  .el-select__tags {
    line-height: 24px!important;
  }
</style>
