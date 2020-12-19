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
            document.querySelectorAll('section[id]').forEach((section) => {
                observer.observe(section);
            });
            
        });
    }

    useEffect(()=>{
        //observe();
    }, [])

    return(
        <div className="main-nav-container">
            <nav className="section-nav">
		        <ol>
		        	<li><a href="#beforewegetstarted">Before We Get Started</a></li>
		        	<li><a href="#preknowledge">第一步：理论知识</a>
		        		<ul>
		        			<li><a href="#ckbconcept">让我们以一种简化的方式来理解CKB</a></li>
		        			<li><a href="#howtoownacell">怎样才能拥有一个 Cell</a></li>
		        			<li><a href="#endpoints--city-detail">怎么知道你的Cell属于你？</a></li>
		        			<li><a href="#endpoints--city-config">课间休息</a></li>
		        			<li><a href="#endpoints--city-spots-overview">真正的代码藏在哪里？</a></li>
		        			<li><a href="#endpoints--city-spot-detail">锁的代码如果丢了怎么办？</a></li>
		        			<li><a href="#endpoints--city-icons-overview">交易就是销毁一些盒子，再创造一些盒子</a></li>
		        			<li><a href="#endpoints--city-icon-detail">type 锁的作用</a></li>
                            <li><a href="#endpoints--city-config">课间休息</a></li>
		        		</ul>
		        	</li>
		        	<li><a href="#handson">第二步：动手实践</a>
                        <ul>
                            <li><a href="#expanders">观察一条链</a></li>
		        			<li><a href="#howtoownacell">发送一笔交易</a>
                                <ul>
                                    <li><a href="#endpoints--city-detail">拼接一个最简单的转账交易</a></li>
		        			        <li><a href="#endpoints--city-config">对交易进行签名</a></li>
		        			        <li><a href="#endpoints--city-spots-overview">把交易签名放回到交易中</a></li>
		        			        <li><a href="#endpoints--city-spot-detail">把交易发送到链上</a></li>
                                </ul>
                            </li>
		        		</ul>
                    </li>
		        	<li><a href="#filters">Filters</a></li>
		        </ol>
	        </nav>
        </div>
    )
}