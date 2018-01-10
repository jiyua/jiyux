<?php
namespace Home\Controller;
use Think\Controller;
class AdminController extends Controller {
    public function _before_admin(){
      if(session('iriguchi')!="hai"){
        $this->error("您还未登录","index");
      }
    }
    public function _before_del(){
      if(session('iriguchi')!="hai"){
        $this->error("您还未登录","index");
      }
    }
    public function _before_ping(){
      if(session('iriguchi')!="hai"){
        $this->error("您还未登录","index");
      }
    }
    public function _before_replydel(){
      if(session('iriguchi')!="hai"){
        $this->error("您还未登录","index");
      }
    }
    public function index(){
      $this->show("请输入密码口令，请打开专用登陆器，使用post登陆");
    }
    public function iriguchi(){
      $this->display();
    }
    public function login(){
      $username=I('username');
      $password=I('password');
      if($username=="admin" && $password=="wazyt1314520"){
        session("iriguchi","hai");
        $this->success("登陆成功","admin");
      }else{
        $this->error("登陆失败","index");
      }
    }
    public function admin(){
      $m=M('Message');
      $count=$m->count();
      $page=new \Think\Page($count,20);
      $show=$page->show();
      $list=$m->limit($page->firstRow.','.$page->listRows)->order('id desc')->select();
      $this->assign('list',$list);
      $this->assign('data',$show);
      $this->display();
    }
    public function del(){
      $id=I('id');
      $n=M('Reply');
      $m=M('Message');
      $res=$m->where("id=$id")->delete();
      $res2=$n->where("gid=$id")->delete();
      if($res!=0){
        $this->success("删除成功");
      }else{
        $this->error("删除失败");
      }
    }
    public function ping(){
      $id=I('id');
      $n=M('Reply');
      $res=$n->where("gid=$id")->select();
      $this->assign('data',$res);
      $this->assign('id',$id);
      $this->display();
    }
    public function replydel(){
      $id=I('id');
      $n=M('Reply');
      $res=$n->where("id=$id")->delete();
      if($res!=0){
        $this->success("删除成功");
      }else{
        $this->error("删除失败");
      }
    }
}
?>