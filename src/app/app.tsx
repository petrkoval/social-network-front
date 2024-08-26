import {Button, Space} from 'antd';
import React from 'react';

const App: React.FC = () => (
	<Space>
		<Button type="primary">Primary</Button>
		<Button type="link">Default</Button>
		<Button type="dashed">Default</Button>
		<Button type="text">Default</Button>
	</Space>
);

export default App;