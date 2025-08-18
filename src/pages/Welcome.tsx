import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Card, theme, Typography, message, notification, Button, Space, Divider } from 'antd';
import React from 'react';

/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */
const InfoCard: React.FC<{
  title: string;
  index: number;
  desc: string;
  href: string;
}> = ({ title, href, index, desc }) => {
  const { useToken } = theme;

  const { token } = useToken();

  return (
    <div
      style={{
        backgroundColor: token.colorBgContainer,
        boxShadow: token.boxShadow,
        borderRadius: '8px',
        fontSize: '14px',
        color: token.colorTextSecondary,
        lineHeight: '22px',
        padding: '16px 19px',
        minWidth: '220px',
        flex: 1,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '4px',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            lineHeight: '22px',
            backgroundSize: '100%',
            textAlign: 'center',
            padding: '8px 16px 16px 12px',
            color: '#FFF',
            fontWeight: 'bold',
            backgroundImage:
              "url('https://gw.alipayobjects.com/zos/bmw-prod/daaf8d50-8e6d-4251-905d-676a24ddfa12.svg')"
          }}
        >
          {index}
        </div>
        <div
          style={{
            fontSize: '16px',
            color: token.colorText,
            paddingBottom: 8,
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          fontSize: '14px',
          color: token.colorTextSecondary,
          textAlign: 'justify',
          lineHeight: '22px',
          marginBottom: 8,
        }}
      >
        {desc}
      </div>
      <a
        onClick={(e) => {
          e.preventDefault();
          if (title === "使用指南") {
            message.loading('功能开发中...', 1.5);
          } else {
            window.open(href, '_blank');
          }
        }}
        href={href}
        target="_blank"
        rel="noreferrer"
        style={{ cursor: 'pointer' }}
      >
        了解更多 {'>'}
      </a>
    </div>
  );
};

const Welcome: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');
  const [api, contextHolder] = notification.useNotification();

  const close = () => {
    console.log(
      'Notification was closed. Either the close button was clicked or duration time elapsed.',
    );
  };

  const openNotification = () => {
    const key = `open${Date.now()}`;
    const btn = (
      <Space>
        <Button type="link" size="small" onClick={() => api.destroy()}>
          取消
        </Button>
        <Button type="primary" size="small" onClick={() => api.destroy(key)}>
          确定
        </Button>
      </Space>
    );
    api.open({
      message: '扩列请求',
      description:
        '劳斯请和我扩列吧.',
      btn,
      key,
      onClose: close,
      placement: 'bottomRight',
    });
  };

  return (
    <PageContainer>
      <Card
        style={{
          borderRadius: 8,
          height: '720px',
        }}
        bodyStyle={{
          backgroundImage:
            initialState?.settings?.navTheme === 'realDark'
              ? 'background-image: linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)'
              : 'background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
        }}
      >
        <div>
          <Typography.Title level={2}>欢迎来到「咕噜咕噜」！</Typography.Title>
          <div
            style={{
              fontSize: '16px',
              color: token.colorTextSecondary,
              lineHeight: '24px',
              marginTop: 16,
              marginBottom: 32,
              width: '100%',
            }}
          >
            <div>
              {/*水平分割线 */}
              <Divider orientation='left'>一款专为谷子爱好者设计的收藏管理工具</Divider>
              <br />
              <Typography.Paragraph>亲爱的二次元同好，无论你心爱的是闪亮徽章、精致立牌、唯美色纸，还是琳琅满目的吧唧，这里都是你珍藏每一份心动的理想家园。</Typography.Paragraph>

              <Typography.Paragraph>
                「咕噜咕噜」专为热爱而生，致力于终结“谷子迷了路”和“收纳混乱”的烦恼！为你提供：
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;<Typography.Text strong>清晰归档：</Typography.Text> 为每件宝贝建立专属档案，归属一目了然。
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;<Typography.Text strong>智能分类：</Typography.Text> 按角色、作品、类型...随心定义，井井有条。
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;<Typography.Text strong>整洁有序：</Typography.Text> 告别杂乱，让你的收藏殿堂时刻闪耀光彩！！！
              </Typography.Paragraph>

              <Typography.Paragraph>
                <Typography.Text delete>加入我们的用户群，与其他谷子爱好者分享经验、交换收藏、共同成长加入用户群。</Typography.Text>  （其实没有 TAT）
              </Typography.Paragraph>

              <Typography.Paragraph>
                喜欢「咕噜咕噜」带来的轻松管理体验？
                <br />
                你的认可，是我们前进的最大动力！
              </Typography.Paragraph>
            </div>
            <div style={{ marginTop: 16 }}>
              <Typography.Paragraph><Typography.Text code>v1.0.0</Typography.Text> 版本已发布，欢迎体验！</Typography.Paragraph>
            </div>

            {/* 目标位置 */}
            {contextHolder}
            <div style={{ marginTop: 48, display: 'flex', justifyContent: 'center' }}>
              <Button type="primary" onClick={openNotification}>
                请点击我
              </Button>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
              marginTop: 16,
            }}
          >
            <InfoCard
              index={1}
              href="https://github.com/Octaver2131/Octgu-backend-demo"
              title="查看后端代码"
              desc="咕噜咕噜的后端基于Spring Boot构建，提供了稳定可靠的API服务。"
            />
            <InfoCard
              index={2}
              title="查看前端代码"
              href="https://github.com/Octaver2131/Octgu-frontend-demo"
              desc="咕噜咕噜的前端基于Ant Design Pro构建，提供了美观易用的用户界面。"
            />
            <InfoCard
              index={3}
              title="使用指南"
              href="#"
              desc="了解如何使用咕噜咕噜的各项功能，快速上手管理你的谷子收藏。"
            />
          </div>
        </div>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
