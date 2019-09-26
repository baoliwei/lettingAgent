<template>
  <div class="audio-ui">
    <div class="audio-object">
      <audio ref="audio" :src="resource"></audio>
    </div>
    <div class="player-wrap">
      <div class="player-btn" @click="play()">
        <div :class="meta.paused ? 'rrc-audio-font rrc-pause' : 'rrc-audio-font rrc-play'"></div>
      </div>
      <div class="player-progress" ref="progress">
        <div class="player-progress-bar" :style=width></div>
      </div>
      <div class="player-time">{{meta.recordTime}}/{{meta.totalTime}}</div>
      <div class="player-voice" @click="mute()">
        <div :class="meta.voice ? 'rrc-audio-font rrc-sound' : 'rrc-audio-font rrc-mute'"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatTime } from '../util'

export default {
  name: 'audio-ui',
  props: {
    resource: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      meta: {
        paused: false,
        voice: true,
        total: 0,
        record: 0,
        totalTime: '00:00',
        recordTime: '00:00',
        complete: 0
      },
      $target: {},
      $progress: {}
    }
  },
  mounted () {
    this.$target = this.$refs.audio
    this.$progress = this.$refs.progress
    this.bindEvent()
  },
  activated () {
    this.$target = this.$refs.audio
    this.$progress = this.$refs.progress
  },
  computed: {
    width () {
      return `width: ${Number(this.meta.complete).toFixed(2)}%;`
    }
  },
  watch: {
    resource (source) {
      if (!source) {
        return false
      }
      this.$target.src = source
    }
  },
  methods: {
    play () {
      if (this.meta.total === 0) return false
      if (!this.meta.paused) {
        /*
        * 屏蔽所有的录音
        * */
        [].forEach.call(document.querySelectorAll('audio'), $item => {
          $item.pause()
        })
        /*
        * 开始播放
        * */
        this.$target.play()
        this.meta.paused = true
      } else {
        this.$target.pause()
        this.meta.paused = false
      }
    },
    mute () {
      if (this.meta.voice) {
        this.meta.voice = false
        this.$target.volume = 0
      } else {
        this.meta.voice = true
        this.$target.volume = 1
      }
    },
    bindEvent () {
      /**
       * 播放
       */
      let play = () => {
        this.meta.paused = true
      }
      this.$target.removeEventListener('playing', play)
      this.$target.addEventListener('playing', play)
      /**
       * 暂停
       */
      let pause = () => {
        this.meta.paused = false
      }
      this.$target.removeEventListener('pause', pause)
      this.$target.addEventListener('pause', pause)
      /**
       * 可以播放通知
       */
      let canplay = () => {
        this.meta.total = this.$target.duration * 1000
        this.meta.totalTime = formatTime(this.meta.total)
      }
      this.$target.removeEventListener('canplay', canplay)
      this.$target.addEventListener('canplay', canplay)
      /**
       * 播放时长变化
       */
      let timeUpdate = () => {
        this.meta.record = this.$target.currentTime * 1000
        this.meta.recordTime = formatTime(this.meta.record)
        this.meta.complete = (this.meta.record / this.meta.total).toFixed(2) * 100
      }
      this.$target.removeEventListener('timeupdate', timeUpdate)
      this.$target.addEventListener('timeupdate', timeUpdate)
      /**
       * 绑定手动调整进度条
       */
      let previousStatus = 'UNPLAY'
      let mouseMove = (e) => {
        this.meta.complete = e.offsetX
        this.meta.record = (e.offsetX / 100) * this.meta.total
        this.$target.currentTime = this.meta.record / 1000
      }
      let mouseUp = () => {
        this.$progress.removeEventListener('mousemove', mouseMove)
        document.removeEventListener('mouseup', mouseUp)
        if (previousStatus === 'PLAY') {
          this.play()
        }
      }
      let mouseDown = () => {
        if (this.meta.paused) {
          previousStatus = 'PLAY'
          this.play()
        }
        this.$progress.removeEventListener('mousemove', mouseMove)
        this.$progress.addEventListener('mousemove', mouseMove)
        document.addEventListener('mouseup', mouseUp)
      }
      this.$progress.removeEventListener('mousedown', mouseDown)
      this.$progress.addEventListener('mousedown', mouseDown)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../../assets/font/rrc-font.css";

  .audio-ui {
    display: inline-block;
    height: 30px;
    min-width: 225px;
  }

  .audio-ui .audio-object {
    overflow: hidden;
    display: inline;
    height: 0;
  }

  /* stylelint-disable */
  .audio-ui .player-wrap span {
    height: inherit !important;
    float: none !important;
    width: inherit !important;
  }

  /* stylelint-enable */
  .audio-ui .player-wrap {
    float: left;
    height: 30px;
    box-sizing: border-box;
    border: 1px solid #fd521d;
    border-radius: 6px;
  }

  .audio-ui .player-wrap > div {
    float: left;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }

  .audio-ui .player-wrap .player-btn {
    width: 25px;
    cursor: pointer;
  }

  .audio-ui .player-wrap .player-progress {
    width: 100px;
    height: 5px;
    margin-top: 12.5px;
    background: transparent;
    border-radius: 5px;
    border: 1px solid #fd521d;
    cursor: pointer;
  }

  .audio-ui .player-wrap .player-progress .player-progress-bar {
    border-radius: 5px;
    width: 0;
    height: 3px;
    background: #fd521d;
  }

  .audio-ui .player-wrap .player-time {
    margin-left: 5px;
    font-size: 12px;
    color: #fd521d;
  }

  .audio-ui .player-wrap .player-voice {
    width: 25px;
    cursor: pointer;
  }
</style>
