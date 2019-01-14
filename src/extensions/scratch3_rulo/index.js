const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const languageNames = require('scratch-translate-extension-languages');
const formatMessage = require('format-message');



const Clone = require('../../util/clone');//追加
const Color = require('../../util/color');
const MathUtil = require('../../util/math-util');
const RenderedTarget = require('../../sprites/rendered-target');
const log = require('../../util/log');
const StageLayering = require('../../engine/stage-layering');

const iconURI = 'data:image/png;base64,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';

/*-------------------------------*/
/*----------　変数定義　-----------*/
/*-------------------------------*/
var socket = new WebSocket('ws://localhost:9090');

var left_bumper_state = false;
var front_bumper_state = false;
var right_bumper_state = false;
var button_0_state = false;
var button_1_state = false;
var button_2_state = false;
var recognition_word = "";
var turning_flag = false;
var turning_count = 0;
var turning_num_array = [];
var go_straight_flag = false;
var go_straight_count = 0;
var go_straight_num_array = [];
var count = 0;
var call_count = 0;
var wai_time = 0;

const adv_scratch_ros = {"op": "advertise", "topic": "/scratch_ros", "type": "std_msgs/String"};
const sub_ros_scratch = {"op": "subscribe", "topic": "/ros_scratch", "type": "std_msgs/String"};



// ビジーwaitを使う方法
var sleep = function(waitMsec) {
  var startMsec = new Date();

  console.log('--1');
  //返り値での止め方
  var id = setInterval(function(){

    socket.onmessage = function() {
      console.log('--2');
      var obj = JSON.parse(event.data);
      var msg_data = obj.msg.data;
      if( msg_data.indexOf('go_straight:') != -1){
          if(msg_data.substr(12)=='true'){
            console.log('--3');
            go_straight_flag = true;
          }//if
      }//if

      if(go_straight_flag == true){
        console.log('--4');
        go_straight_flag = false;
        clearInterval(id);　//idをclearIntervalで指定している
      }//if

    }//socket.onmessage

    if(go_straight_flag == false){
      console.log('--5');
      var test_req = new Test_req();
      test_req.sleep();
    }//if


  }, 3000);

  console.log('--6');

  // 指定ミリ秒間だけループさせる（CPUは常にビジー状態）

}//sleep


var count_pub_scratch_ros = function(str){
    var data = {"data": str};
    var msg = { "op": "publish", "topic": "/scratch_ros", "msg": data };
    socket.send(JSON.stringify(msg));
    console.log('// publish data : ' + str);
};

var countAngle = function(num) {
  if(100 >= num && num >= -100 && turning_flag == false){
      console.log('Pub: countAngle data : ' + num);
      turning_flag = true;
      count_pub_scratch_ros("T:"+String(num));
  }
  console.log('[turning_count]:' + turning_count);
}//countAngle

var countGo_straight = function(num) {
  if(100 >= num && num >= -100 && go_straight_flag == false){
      console.log('Pub: countGo_straight data : ' + num);
      go_straight_flag = true;
      count_pub_scratch_ros("S:"+String(num));
  }
  console.log('[go_straight_count]:' + go_straight_count);
}//countGo_straightk

const ColorParam = {//追加
    COLOR: 'color',
    SATURATION: 'saturation',
    BRIGHTNESS: 'brightness',
    TRANSPARENCY: 'transparency'
};


socket.onopen = function () {//接続が確立された際、TopicのPubSub設定を行う
    socket.send(JSON.stringify(adv_scratch_ros));
    socket.send(JSON.stringify(sub_ros_scratch));
    console.log("Advertise OK");
}//onopen


socket.onmessage = function() {

    var obj = JSON.parse(event.data);
    var msg_data = obj.msg.data;
    console.log('Message from server' + msg_data);
    //alert("== IN SUB ==" + msg_data)

    if ( msg_data.indexOf('turn:') != -1) {
        if(msg_data.substr(5)=='true'){
          console.log("Sub: turning_flag");
          turning_flag = false;
          if(turning_count>0){
            console.log("Count--> countAngle " + turning_count);
            console.log("|||||| angle num -> " + turning_num_array[0]);
            countAngle(turning_num_array[0]);
            turning_num_array.shift();//先頭削除
            turning_count--;
          }
          else{//初期化
            turning_num_array = [];
          }
        }
    }else if( msg_data.indexOf('go_straight:') != -1){
        if(msg_data.substr(12)=='true'){
          console.log("Sub: go_straight_flag");
          go_straight_flag = true;
        }
    }else if( msg_data.indexOf('left_bumper:') != -1){
        if(msg_data.substr(12)=='true'){
          left_bumper_state = true;
        }
    }else if( msg_data.indexOf('front_bumper:') != -1){
        if(msg_data.substr(13)=='true'){
          front_bumper_state = true;
        }
    }else if( msg_data.indexOf('right_bumper:') != -1){
        if(msg_data.substr(13)=='true'){
          right_bumper_state = true;
        }
    }else if( msg_data.indexOf('button_0:') != -1){
        button_0_state = true;
    }else if( msg_data.indexOf('button_1:') != -1){
        button_1_state = true;
    }else if( msg_data.indexOf('button_2:') != -1){
        button_2_state = true;
    }else if( msg_data.indexOf('recognition_word:') != -1){
        recognition_word = msg_data.substr(17);
    }
}//onmessage


class Scratch3TurtleBotBlocks {
    constructor (runtime) {
        this.runtime = runtime;
    }

    static get STATE_KEY () {
        return 'scratch.turtlebot';
    }

    static get DEFAULT_PEN_STATE () {
        return {
            penDown: false,
            color: 66.66,
            saturation: 100,
            brightness: 100,
            transparency: 0,
            _shade: 50, // Used only for legacy `change shade by` blocks
            penAttributes: {
                color4f: [0, 0, 1, 1],
                diameter: 1
            }
        };
    }//DEFAULT_PEN_STATE

    getInfo () {
        return {
            id: 'turtlebot',
            name: formatMessage({
                id: 'turtlebot.categoryName',
                default: 'TurtleBot'
            }),
            showStatusButton: true,
            menuIconURI: iconURI,
            blockIconURI: iconURI,
            blocks: [
                {
                    opcode: 'setROSIP',
                    text: formatMessage({id: 'turtlebot.setROSIP', default: '[TURTLEBOT_NAME] に接続する'}),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        TURTLEBOT_NAME: {type: ArgumentType.STRING, menu: 'TURTLEBOT_NAME', defaultValue: "TurtleBot_1"}
                    }
                },
                {
                    opcode: 'stopMotion',
                    text: formatMessage({id: 'turtlebot.stopMotion', default: 'TurtleBotの動きを止める'}),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        TURTLEBOT_STOP: {type: ArgumentType.STRING, menu: 'TURTLEBOT_STOP', defaultValue: ""}
                    }
                },
                {
                    opcode: 'pushBumper',
                    text: formatMessage({id: 'turtlebot.pushBumper', default: '[TURTLEBOT_BUMPER] のバンパーが押された時'}),
                    blockType: BlockType.HAT,
                    arguments: {
                        TURTLEBOT_BUMPER: {type: ArgumentType.STRING, menu: 'TURTLEBOT_BUMPER', defaultValue: "前方"}
                    }
                },
                {
                    opcode: 'pushButton',
                    text: formatMessage({id: 'turtlebot.pushButton', default: '[TURTLEBOT_BUTTON] のボタンが押された時'}),
                    blockType: BlockType.HAT,
                    arguments: {
                        TURTLEBOT_BUTTON: {type: ArgumentType.STRING, menu: 'TURTLEBOT_BUTTON', defaultValue: "0"}
                    }
                },
                {
                    opcode: 'pubSound',
                    text: formatMessage({id: 'turtlebot.pubSound', default: ' [TURTLEBOT_SOUND] のブザー'}),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        TURTLEBOT_SOUND: {type: ArgumentType.STRING, menu: 'TURTLEBOT_SOUND', defaultValue: "ON"}
                    }
                },
                {
                    opcode: 'pubLED_1',
                    text: formatMessage({id: 'turtlebot.pubLED_1', default: 'LED_1を [TURTLEBOT_LED] にする'}),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        TURTLEBOT_LED: {type: ArgumentType.STRING, menu: 'TURTLEBOT_LED', defaultValue: "消灯"}
                    }
                },
                {
                    opcode: 'pubForeverGo_straight',
                    text: formatMessage({id: 'turtlebot.pubForeverGo_straight', default: '(くりかえす動き専用)　[GO_STRAIGHT] cm 直進する --マイナスで後進'}),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        GO_STRAIGHT: {
                          type: ArgumentType.ANGLE,
                          defaultValue: formatMessage({id: 'turtlebot.turtlebot_go_straight',　default: '15'})}
                    }
                },
                {
                    opcode: 'pubGo_straight',
                    text: formatMessage({id: 'turtlebot.pubGo_straight', default: ' [GO_STRAIGHT] cm 直進する--マイナスで後進'}),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        GO_STRAIGHT: {
                          type: ArgumentType.ANGLE,
                          defaultValue: formatMessage({id: 'turtlebot.turtlebot_go_straight',　default: '15'})}
                    }
                },
                {
                    opcode: 'pubForeverAngle',
                    text: formatMessage({id: 'turtlebot.pubForeverAngle', default: '(くりかえす動き専用)　[TURTLEBOT_ANGLE] に角度を指定　--マイナスが右回転'}),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        TURTLEBOT_ANGLE: {
                            type: ArgumentType.ANGLE,
                            defaultValue: formatMessage({id: 'turtlebot.angle',　default: '90'})
                        }
                    }
                },
                {
                    opcode: 'pubAngle',
                    text: formatMessage({id: 'turtlebot.pubAngle', default: '[TURTLEBOT_ANGLE] に角度を指定　--マイナスが右回転'}),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        TURTLEBOT_ANGLE: {
                            type: ArgumentType.ANGLE,
                            defaultValue: formatMessage({id: 'turtlebot.angle',　default: '90'})
                        }
                    }
                },
                {
                    opcode: 'pubRecognition_word_start',
                    text: formatMessage({id: 'turtlebot.pubRecognition_word_start', default: ' 音声認識の開始判定 [TURTLEBOT_REC_WORD_START] '}),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        TURTLEBOT_REC_WORD_START: {type: ArgumentType.STRING, menu: 'TURTLEBOT_REC_WORD_START', defaultValue: "true"}
                    }
                },
                {
                    opcode: 'pubSpeech',
                    text: formatMessage({id: 'turtlebot.pubSpeech', default: '[WORDS] と話す'}),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        WORDS: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({id: 'turtlebot.turtlebot_speech',　default: 'Hellow'})
                        }
                    }
                },
                {
                    opcode: 'boolRecognition_word',
                    text: formatMessage({id: 'turtlebot.boolRecognition_word', default: ' [TURTLEBOT_REC_WORD] という言葉を認識しているか?'}),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        TURTLEBOT_REC_WORD: {
                          type: ArgumentType.STRING,
                          defaultValue: formatMessage({id: 'turtlebot.turtlebot_boolrecognition_word',　default: ''})}
                    }
                },
                {
                    opcode: 'boolBumper',
                    text: formatMessage({id: 'turtlebot.boolBumper',　default: '[TURTLEBOT_BUMPER] のバンパーが押される'}),
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        TURTLEBOT_BUMPER: {type: ArgumentType.STRING, menu: 'TURTLEBOT_BUMPER', defaultValue: "前方"}
                    }
                }
            ],
            menus: {
                TURTLEBOT_NAME: ["TurtleBot_1","TurtleBot_2"],
                TURTLEBOT_BUTTON: ["0","1","2"],
                TURTLEBOT_MODE: ["マニュアルモード","ノーマルモード"],
                TURTLEBOT_LED: ["消灯","赤","黃","緑"],
                TURTLEBOT_SOUND: ["ON","OFF","RECHARGE","BUTTON","ERROR","CLEANINGSTART","CLEANINGEND"],
                TURTLEBOT_BUMPER: ["前方","左","右"],
                TURTLEBOT_REC_WORD_START: ["true","false"]
            }
        }
    }//getInfo

    pub_scratch_ros (str){
        var data = {"data": str};
        var msg = { "op": "publish", "topic": "/scratch_ros", "msg": data };
        socket.send(JSON.stringify(msg));
        console.log('// publish data : ' + str);
    };

    srv_odom (str){
        var srv_list = [];
        //var srv = {"res_str": str};//json
        //srv_list.push(srv);
        //var req = {"op": "call_service", "service": "/odom_base_ctrl", "args"： srv_list};
        //socket.send(JSON.stringify(req));
        console.log('// service req : ' + str);
    };//srv_scratch_ros


    pubGo_straight (args) {
      console.log('Srv: Go_straight data : ' + args.GO_STRAIGHT);


      //this.srv_odom("S:"+String(args.GO_STRAIGHT));
      //sleep(5000);

      console.log('last line ');
    }//pubGo_straight


    setROSIP (args) {
        if(String(args.TURTLEBOT_NAME) == "TurtleBot_1"){
            socket = new WebSocket('ws://192.168.11.49:9090');
        }else if(String(args.TURTLEBOT_NAME) == "TurtleBot_2"){
            socket = new WebSocket('ws://192.168.11.11:9090');
        }
    }//setROSIP

    stopMotion (args) {
      this.pub_scratch_ros("motion_stop:True");
    }//stopMotion

    pushBumper (args) {//HAT
        if(String(args.TURTLEBOT_BUMPER) == "右" && right_bumper_state == true){
            return true;
        }else if(String(args.TURTLEBOT_BUMPER) == "前方" && front_bumper_state == true){
            return true;
        }else if(String(args.TURTLEBOT_BUMPER) == "左" && left_bumper_state == true){
            return true;
        }else{ return false; }
    }//pushBumper

    pushButton (args) {//HAT
        if(String(args.TURTLEBOT_BUTTON) == "0" && button_0_state == true){
            button_0_state = false;
            return true;
        }else if(String(args.TURTLEBOT_BUTTON) == "1" && button_1_state == true){
            button_1_state = false;
            return true;
        }else if(String(args.TURTLEBOT_BUTTON) == "2" && button_2_state == true){
            button_2_state = false;
            return true;
        }else{ return false; }
    }//pushButton

    pubLED_1 (args) {
        if(String(args.TURTLEBOT_LED) == "消灯"){
            this.pub_scratch_ros("LED_1:0");
        }else if(String(args.TURTLEBOT_LED) == "緑"){
            this.pub_scratch_ros("LED_1:1");
        }
        else if(String(args.TURTLEBOT_LED) == "黃"){
            this.pub_scratch_ros("LED_1:2");
        }
        else if(String(args.TURTLEBOT_LED) == "赤"){
            this.pub_scratch_ros("LED_1:3");
        }
    }//pubLED_1










    pubForeverGo_straight (args) {
      if(100 >= args.GO_STRAIGHT && args.GO_STRAIGHT >= -100 && go_straight_flag==false){
        console.log('Pub: Forever go_straight data : ' + args.GO_STRAIGHT);
        go_straight_flag = true;
        this.pub_scratch_ros("S:"+String(args.GO_STRAIGHT));
      }
    }//pubForeverGo_straight

    pubAngle (args) {
      if(turning_flag==false){
        console.log('Pub: Angle data : ' + args.TURTLEBOT_ANGLE);
        turning_flag = true;
        this.pub_scratch_ros("T:"+String(args.TURTLEBOT_ANGLE));
      }
      else{
        console.log('## Storage Angle');
        turning_num_array.push(Number(args.TURTLEBOT_ANGLE));
        turning_count++;
      }
      console.log('turning_num_array: ' + turning_num_array);
    }//pubAngle

    pubForeverAngle (args) {
      if(turning_flag==false){
        console.log('Pub: Forever Angle data : ' + args.TURTLEBOT_ANGLE);
        turning_flag = true;
        this.pub_scratch_ros("T:"+String(args.TURTLEBOT_ANGLE));
      }
    }//pubForeverAngle

    pubSound (args) {
        if(String(args.TURTLEBOT_SOUND) == "ON"){
            this.pub_scratch_ros("sound:0");
        }else if(String(args.TURTLEBOT_SOUND) == "OFF"){
            this.pub_scratch_ros("sound:1");
        }else if(String(args.TURTLEBOT_SOUND) == "RECHARGE"){
            this.pub_scratch_ros("sound:2");
        }else if(String(args.TURTLEBOT_SOUND) == "BUTTON"){
            this.pub_scratch_ros("sound:3");
        }else if(String(args.TURTLEBOT_SOUND) == "ERROR"){
            this.pub_scratch_ros("sound:4");
        }else if(String(args.TURTLEBOT_SOUND) == "CLEANINGSTART"){
            this.pub_scratch_ros("sound:5");
        }else if(String(args.TURTLEBOT_SOUND) == "CLEANINGEND"){
            this.pub_scratch_ros("sound:6");
        }
    }//pubSound

    pubRecognition_word_start (args) {
      if(String(args.TURTLEBOT_REC_WORD_START) == "true"){
          this.pub_scratch_ros("recognition_word_start:"+String(args.TURTLEBOT_REC_WORD_START));
      }else if(String(args.TURTLEBOT_REC_WORD_START) == "false"){
          this.pub_scratch_ros("recognition_word_start:"+String(args.TURTLEBOT_REC_WORD_START));
      }
    }//pubRecognition_word_start

    boolBumper (args) {
      if(String(args.TURTLEBOT_BUMPER) == "右" && right_bumper_state == true){
          console.log("Sub: right_bumper_state --true");
          right_bumper_state = false;
          return true;
      }else if(String(args.TURTLEBOT_BUMPER) == "前方" && front_bumper_state == true){
          console.log("Sub: front_bumper_state --true");
          front_bumper_state = false;
          return true;
      }else if(String(args.TURTLEBOT_BUMPER) == "左" && left_bumper_state == true){
          console.log("Sub: left_bumper_state --true");
          left_bumper_state = false;
          return true;
      }else{
        console.log("Sub: bumper_state --false");
        return false;
      }
    }//boolBumper

    pubSpeech (args) {
        this.pub_scratch_ros("speech_word:" + String(args.WORDS));
    }//pubSpeech

    boolRecognition_word (args) {
      if(String(args.TURTLEBOT_REC_WORD) == recognition_word){
          return true;
      }else{ return false; }
    }//boolRecognition_word

}//Scratch3TurtleBotBlocks

module.exports = Scratch3TurtleBotBlocks;
