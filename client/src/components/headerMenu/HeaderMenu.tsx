import React from 'react';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

const HeaderMenu: React.FC = () => {
	return (
		<Layout>
			<Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
				<div
					style={{
						float: 'left',
						width: 120,
						height: 31,
						margin: '16px 24px 16px 0',
						background: 'rgba(255, 255, 255, 0.2)'
					}}
				/>
				<Menu
					theme='dark'
					mode='horizontal'
					defaultSelectedKeys={['2']}
					items={new Array(3).fill(null).map((_, index) => ({
						key: String(index + 1),
						label: `nav ${index + 1}`
					}))}
				/>
			</Header>
		</Layout>
	);
};

export default HeaderMenu;
