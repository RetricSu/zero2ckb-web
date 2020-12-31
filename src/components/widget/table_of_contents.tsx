import React, { useEffect } from 'react';
import './table_of_contents.css';

export default function TableOfContents(){

    const observe = () => {
        window.addEventListener('DOMContentLoaded', () => {

            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    const id = entry.target.getAttribute('id');
                    if (entry.intersectionRatio > 0) {
                        document.querySelector(`nav li a[href="#${id}"]`)?.parentElement?.classList.add('active');
                    } else {
                        document.querySelector(`nav li a[href="#${id}"]`)?.parentElement?.classList.remove('active');
                    }
                });
            });
        
            // Track all sections that have an `id` applied
            document.querySelectorAll('[id]').forEach((section) => {
                observer.observe(section);
            });
            
        });
    }

    useEffect(()=>{
        observe();
    }, [])

    return(
        <div className="main-nav-container">
            <nav className="section-nav">
		        <ol>
		        	<li><a href="#before-we-get-started">Before We Get Started</a></li>
		        	<li><a href="#preknowledge">第一步：理论知识</a>
		        		<ul>
		        			<li><a href="#ckb-concept">理解CKB</a></li>
		        			<li><a href="#how-to-own-a-cell">怎样才能拥有一个 Cell</a></li>
		        			<li><a href="#how-to-know-cell-is-yours">怎么知道你的 Cell 属于你？</a></li>
		        			<li><a href="#break1">课间休息</a></li>
		        			<li><a href="#where-is-the-real-code">真正的代码藏在哪里？</a></li>
		        			<li><a href="#what-if-the-code-is-lost">锁的代码如果丢了怎么办？</a></li>
		        			<li><a href="#what-is-tx">交易是什么</a></li>
		        			<li><a href="#the-function-of-type-lock">type 锁的作用</a></li>
                            <li><a href="#break2">课间休息</a></li>
		        		</ul>
		        	</li>
		        	<li><a href="#hands-on">第二步：动手实践</a>
                        <ul>
                            <li><a href="#watch-a-chain">观察一条链</a></li>
		        			<li><a href="#how-to-send-a-tx">发送一笔交易</a>
                                <ul>
                                    <li><a href="#tx-input">交易的 INPUT</a></li>
		        			        <li><a href="#tx-output">交易的 OUTPUT</a></li>
		        			        <li><a href="#sign-a-tx">对交易进行签名</a></li>
                                    <li><a href="#construct-a-tx">构造交易</a></li>
                                    <ul>
                                        <li><a href="#fill-the-tx-form">将交易补充完整</a></li>
                                        <li><a href="#generate-tx-hash">生成交易哈希</a></li>
                                        <li><a href="#generate-message">生成待签名的 message</a></li>
                                        <li><a href="#start-signing">开始签名</a></li>
                                        <li><a href="#put-sign-back">把签名放回到交易中</a></li>
                                        <li><a href="#send-tx">发送交易</a></li>
                                    </ul>
                                </ul>
                            </li>
                            <li><a href="#how-to-send-a-mutisig-tx">发送一笔多签交易</a></li>
                            <li><a href="#how-to-deploy-contract">部署一个合约</a></li>
                            <li><a href="#how-to-deploy-upgradable-contract">部署一个可升级的合约</a></li>
		        		</ul>
                    </li>
		        </ol>
	        </nav>
        </div>
    )
}