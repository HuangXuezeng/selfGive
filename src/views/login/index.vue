<template>
    <div id="login">
        <div class="loginConbox">
            <div class="header">
                <!--<div class="logo">-->
                <!--<img src="../../assets/logo.png">-->
                <!--</div>-->
            </div>
            <div class="loginBox">
                <div class="loginCon">
                    <div id="canvascontainer" ref="can"></div>
                    <span>
                        <img src="../../assets/7CB55E94-0274-4689-9DB0-A9E1A10BF8AE.png" alt="" style="float:left;width:47px">
                        <p class="title">顾家家居员工自助系统</p>
                    </span>
                    <!-- <p class="title">前台: vue + element-ui</p> -->
                    <el-card shadow="always" class="login-module" v-if="false">
                        <div slot="header" class="clearfix formTitlt">
                            <span>密码登录</span>
                            <span class="titIconbox">
                                <i class="iconfont xu-saomadenglu2 fa-lg iconcolor"></i>
                                <i class="iconfont xu-saomadenglu01 el-icon--right fa-lg pointer" @click="smdl = !smdl"></i>
                            </span>
                        </div>
                        <el-form :model="loginForm" status-icon label-width="100px" class="demo-ruleForm">
                            <el-form-item>
                                <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="请输入登录账号"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="请输入登录密码"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button class="subBtn" type="primary" @click="submitForm">登录</el-button>
                            </el-form-item>
                            <p class="smalltxt">
                                <router-link class="a" to="#">忘记密码</router-link>
                                <router-link class="a" to="#">忘记会员名</router-link>
                                <router-link class="a" to="#">免费注册</router-link>
                            </p>
                        </el-form>
                    </el-card>

                    <el-card shadow="always" class="login-module" v-if="false">
                        <div slot="header" class="clearfix formTitlt">
                            <span>扫码登录</span>
                            <span class="titIconbox">
                                <i class="iconfont xu-mimadenglu1 fa-lg iconcolor"></i>
                                <i class="iconfont xu-imagevector el-icon--right fa-lg pointer" @click="smdl = !smdl"></i>
                            </span>
                        </div>
                        <div class="ewmbox">
                            <div class="ewm">
                                <img src="https://img.alicdn.com/tfscom/TB1ivYYyHvpK1RjSZFqwu3XUVXa.png" />
                            </div>
                            <div class="ewmicon">
                                <i class="iconfont xu-saomadenglu fa-2x iconcolor"></i>
                                <p>打开 微信 扫一扫登录</p>
                            </div>
                            <p class="smalltxt">
                                <router-link class="a" to="#">免费注册</router-link>
                            </p>
                        </div>
                    </el-card>
                    <el-card shadow="always" class="login-module" v-if="true" style="height:130px">
                        <el-form :model="loginForm" status-icon label-width="100px" class="demo-ruleForm">
                            <el-form-item>
                                <div style="font-size:13px">
                                    欢迎
                                    <span style="color:red;font-size:14px;font-family: cursive;font-weight:700">{{loginPerson.a0101}} </span>
                                    <span style="color:red;font-size:13px;font-family: cursive;"> {{loginPerson.post}}</span>
                                    登录员工自助
                                </div>

                                <el-button class="subBtn" type="primary" @click="submitForm">立即登录</el-button>
                            </el-form-item>
                        </el-form>
                    </el-card>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import * as dd from 'dingtalk-jsapi'
    export default {
        data() {
            return {
                smdl: true,
                loginForm: {
                    username: "vue-xuadmin",
                    password: "123456",
                },
                loginPerson: {
                    a0101: '',
                    post: ''
                }
            };
        },
        created() {
            // if (dd.env.platform == "notInDingTalk") {
            //     alert("暂不支持浏览器登录");
            //     return;
            // }
            // dd.ready(function() {
            //     dd.runtime.permission.requestAuthCode({
            //         corpId: _config.corpId, // 企业id
            //         onSuccess: function(info) {
            //             code = info.code // 通过该免登授权码可以获取用户身份
            //         }
            //     });
            // });
            this.initMethod()

        },
        methods: {
            initMethod() {
                this.personInform()
            },
            personInform() {
                var that = this
                this.$request.findSomeBasicInfo({
                    jobnumber: '6006212'
                }).then(res => {
                    debugger
                    this.loginPerson = res.data.obj
                    this.$store.dispatch("selfSetRole", res.data.obj)
                    that.$store.getters.selfInfo
                })
            },
            submitForm() {
                let that = this;
                if (this.loginForm.username === "" || this.loginForm.password === "") {
                    this.$message({
                        showClose: true,
                        message: "账号或密码不能为空",
                        type: "error",
                    });
                    return false;
                } else {
                    // 真实请求参考
                    // this.$request.fetchLogin({
                    //   username: that.loginForm.username,
                    //   password: that.loginForm.password
                    // }).then(res => {
                    //   that.$restBack(res.data, () => {
                    //     that.$store.dispatch("setToken", res.data.data.access_token).then(res => {
                    //       that.$router.push({path: "/"})
                    //     })
                    //   }, "登录成功")
                    // }).catch((err) => {
                    //   console.log(err)
                    // })

                    // 将 username 设置为 token 存储在 store，仅为测试效果，实际存储 token 以后台返回为准
                    that.$store
                        .dispatch("setToken", that.loginForm.username)
                        .then(() => {
                            that.$router.push({
                                path: "/"
                            });
                        })
                        .catch((res) => {
                            that.$message({
                                showClose: true,
                                message: res,
                                type: "error",
                            });
                        });
                }
            },
            message() {
                const h = this.$createElement;
                this.$notify({
                    title: "账号密码",
                    message: h(
                        "i", {
                            style: "color: teal"
                        },
                        "账号密码可以随意填写，为了测试效果填写的账号将会被存储为临时假 token"
                    ),
                    duration: 6000,
                });
            },
        },
        mounted() {
            container = document.createElement("div");
            this.$refs.can.appendChild(container);

            camera = new THREE.PerspectiveCamera(
                75,
                window.innerWidth / window.innerHeight,
                1,
                10000
            );
            camera.position.z = 1000;

            scene = new THREE.Scene();

            particles = new Array();

            var PI2 = Math.PI * 2;
            var material = new THREE.ParticleCanvasMaterial({
                color: 0x0078de,
                program: function(context) {
                    context.beginPath();
                    context.arc(0, 0, 1, 0, PI2, true);
                    context.fill();
                },
            });

            var i = 0;

            for (var ix = 0; ix < AMOUNTX; ix++) {
                for (var iy = 0; iy < AMOUNTY; iy++) {
                    particle = particles[i++] = new THREE.Particle(material);
                    particle.position.x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
                    particle.position.z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
                    scene.add(particle);
                }
            }

            renderer = new THREE.CanvasRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            container.appendChild(renderer.domElement);

            document.addEventListener("mousemove", onDocumentMouseMove, false);
            //

            window.addEventListener("resize", onWindowResize, false);

            animate();
            this.message();
        },
        // mounted () {
        // }
    };
    var SEPARATION = 100,
        AMOUNTX = 50,
        AMOUNTY = 50;

    var container;
    var camera, scene, renderer;

    var particles,
        particle,
        count = 0;

    var mouseX = 0,
        mouseY = 0;

    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;

    // animate();

    function init() {}

    function onWindowResize() {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    //

    function onDocumentMouseMove(event) {
        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;
    }

    function onDocumentTouchStart(event) {
        if (event.touches.length === 1) {
            event.preventDefault();

            mouseX = event.touches[0].pageX - windowHalfX;
            mouseY = event.touches[0].pageY - windowHalfY;
        }
    }

    function onDocumentTouchMove(event) {
        if (event.touches.length === 1) {
            event.preventDefault();

            mouseX = event.touches[0].pageX - windowHalfX;
            mouseY = event.touches[0].pageY - windowHalfY;
        }
    }

    //

    function animate() {
        requestAnimationFrame(animate);

        render();
    }

    function render() {
        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (-mouseY - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        var i = 0;

        for (var ix = 0; ix < AMOUNTX; ix++) {
            for (var iy = 0; iy < AMOUNTY; iy++) {
                particle = particles[i++];
                particle.position.y =
                    Math.sin((ix + count) * 0.3) * 50 + Math.sin((iy + count) * 0.5) * 50;
                particle.scale.x = particle.scale.y =
                    (Math.sin((ix + count) * 0.3) + 1) * 2 +
                    (Math.sin((iy + count) * 0.5) + 1) * 2;
            }
        }

        renderer.render(scene, camera);

        count += 0.1;
    }
</script>

<style lang="scss">
    #canvascontainer {
        position: fixed;
        top: 0;
        left: 0;
    }

    #login {
        width: 100%;
        height: 100%;
        background-color: #2d3a4b;

        .loginConbox {
            background: #2d3a4b;
        }

        .header {
            height: 60px;
            position: relative;
            background: #2d3a4b;

            /*border-bottom: 1px solid rgba(255, 255, 255, 0.3);*/
            .logo {
                margin-left: 30px;
                width: 500px;
                float: left;
                height: 40px;
                padding-top: 10px;

                img {
                    height: 100%;
                }
            }
        }

        .loginBox {
            .iconcolor {
                color: #409EFF;
            }

            padding: 74px 0 118px;

            .loginCon {
                width: 990px;
                margin: auto;
                position: relative;
                height: 388px;

                .el-card__header {
                    border-bottom: 0px;
                }

                .title {
                    font-size: 36px;
                    font-weight: 600;
                    color: #ffffff;
                    width: 500px;
                    float: left;
                    margin-top: 0px;

                    &:first-child {
                        font-size: 34px;
                        margin-top: 50px;
                        margin-bottom: 30px;
                    }
                }

                .login-module {
                    width: 380px;
                    height: 325px;
                    margin-top: 60px;
                    border: none;
                    position: absolute;
                    right: 0;

                    .formTitlt {
                        font-size: 18px;
                        font-weight: 400;

                        .titIconbox {
                            float: right;

                            .pointer {
                                cursor: pointer;
                            }
                        }
                    }

                    .smalltxt {
                        text-align: right;

                        .a {
                            text-decoration: none;
                            color: #999999;
                            font-size: 12px;
                            margin-left: 8px;
                        }
                    }
                }

                .el-form-item__content {
                    margin-left: 0px !important;

                    .subBtn {
                        width: 100%;
                    }
                }
            }

            .el-input__inner,
            .el-button,
            .el-card,
            .el-message {
                border-radius: 0px !important;
            }

            .el-form-item__content .ico {
                position: absolute;
                top: 0px;
                left: 0px;
                z-index: 999;
                width: 40px;
                height: 39px;
                text-align: center;
                border-right: 1px solid #ccc;
            }

            .ewmbox {
                width: 100%;
                height: 240px;
                margin-top: -25px;

                .ewm {
                    width: 140px;
                    height: 140px;
                    margin: 20px auto;

                    p {
                        font-size: 12px;
                        padding-left: 40px;
                        margin: 0;
                    }
                }

                .ewmicon {
                    width: 140px;
                    margin: 20px auto 0;

                    .iconfont {
                        float: left;
                    }

                    p {
                        font-size: 12px;
                        padding-left: 40px;
                        margin: 0;
                    }
                }
            }
        }
    }
</style>
