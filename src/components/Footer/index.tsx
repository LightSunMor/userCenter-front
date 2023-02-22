import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import {MYGITHUB} from "@/constants";

const Footer: React.FC = () => {
  const defaultMessage = 'Morning Sun';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'Ant Design Pro',
          title: 'ant_pro',
          href: 'https://pro.ant.design',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <><GithubOutlined /> Morning Sun GitHub</>,
          href: MYGITHUB,
          blankTarget: true,
        },
        {
          key: 'Ant Design',
          title: 'Programming navigation',
          href: 'https://www.code-nav.cn',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
