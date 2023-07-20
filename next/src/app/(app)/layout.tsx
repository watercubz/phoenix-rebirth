import { headers } from "next/headers";
import { PropsWithChildren } from "react";

import { Organism, SidebarItem, Atoms, Templates } from '@kanvas/phoenix'
const { Icons } = Atoms;

const items: SidebarItem[] = [
  {
    key: 'dashboard',
    title: 'Dashboard',
    link: '/home',
    Icon: Icons.Home,
  },
  {
    key: 'leads',
    title: 'Leads',
    link: '/leads',
    Icon: Icons.Briefcase,
  },
  {
    key: 'sponsor',
    title: 'Sponsor',
    link: '/sponsor',
    Icon: Icons.Users,
  }
];

function getPathname() {
  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "";
  return pathname;
}

export default function RoutLayout({ children }: PropsWithChildren) {
  return (
    <Templates.BaseLayout
      Sidebar={
        <Organism.Sidebar
          items={items}
          Logo={<Logo />}
          pathname={getPathname()}
        />
      }
    >
      <Organism.Header />
      {children}
    </Templates.BaseLayout>
  )
}

function Logo() {
  return (
    <svg width="160" height="32" viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1735_3775)"><path d="M30.102 9.25188V11.195H34.4042C34.241 12.0112 33.8834 12.6757 33.3354 13.1654C32.7369 13.7017 31.9402 13.9738 30.9687 13.9738C30.2458 13.9738 29.5929 13.8105 29.0294 13.488C28.4698 13.1654 28.0228 12.6991 27.708 12.1006C27.3894 11.4982 27.2261 10.7909 27.2261 9.99806C27.2261 9.20525 27.3894 8.50182 27.708 7.90333C28.0267 7.30872 28.4698 6.84625 29.0294 6.52368C29.5929 6.20112 30.2458 6.03789 30.9687 6.03789C31.6255 6.03789 32.2123 6.1778 32.7097 6.45373C33.2033 6.72577 33.5919 7.13384 33.8718 7.67015L33.93 7.78674H36.6505L36.5378 7.49526C36.0908 6.3488 35.3602 5.44717 34.3653 4.82147C33.3743 4.19966 32.2317 3.88098 30.9648 3.88098C29.8572 3.88098 28.8234 4.14525 27.8907 4.66602C26.958 5.18679 26.2079 5.9213 25.6638 6.85013C25.1197 7.77897 24.8438 8.83605 24.8438 10.0019C24.8438 11.1678 25.1197 12.2288 25.6638 13.1538C26.2079 14.0826 26.9541 14.8132 27.8829 15.3379C28.8079 15.8586 29.8455 16.1229 30.9648 16.1229C32.0063 16.1229 32.9662 15.8858 33.8212 15.4234C34.6723 14.9609 35.3758 14.3313 35.9082 13.5502C35.9665 13.4647 36.0248 13.3753 36.0792 13.2859C36.6388 12.3687 36.8992 11.3 36.9031 10.2235V9.25577H30.1059L30.102 9.25188Z" fill="white"></path><path d="M49.0129 11.0396H40.8088C40.8749 11.8985 41.1936 12.5863 41.7649 13.1071C42.3362 13.6279 43.0396 13.8883 43.8713 13.8883C45.0683 13.8883 45.9116 13.3869 46.4052 12.3881H48.803C48.4766 13.3753 47.8897 14.1836 47.0386 14.8132C46.1875 15.4428 45.1304 15.7576 43.8713 15.7576C42.8453 15.7576 41.9242 15.5283 41.1159 15.0658C40.3036 14.6033 39.6663 13.9543 39.2077 13.1188C38.7452 12.2793 38.5159 11.3116 38.5159 10.204C38.5159 9.09643 38.7413 8.12873 39.1883 7.28928C39.6352 6.44984 40.2648 5.80471 41.077 5.35001C41.8892 4.89531 42.822 4.66602 43.8752 4.66602C44.9284 4.66602 45.7911 4.88754 46.5839 5.32669C47.3767 5.76973 47.9947 6.38766 48.4338 7.18824C48.8769 7.98882 49.0945 8.906 49.0945 9.94365C49.0945 10.3478 49.0673 10.7093 49.0168 11.0357L49.0129 11.0396ZM46.7705 9.24799C46.7588 8.42798 46.4635 7.77508 45.8922 7.28151C45.3209 6.78795 44.6136 6.53922 43.7663 6.53922C43.0007 6.53922 42.3439 6.78406 41.7999 7.26985C41.2558 7.75564 40.9293 8.41632 40.8244 9.24799H46.7666H46.7705Z" fill="white"></path><path d="M65.4987 4.8409L62.1681 15.5788H59.8285L57.6638 7.64682L55.4992 15.5788H53.1596L49.8096 4.8409H52.0714L54.3138 13.4724L56.5951 4.8409H58.9152L61.0993 13.4336L63.3223 4.8409H65.5064H65.4987Z" fill="white"></path><path d="M66.8939 7.29706C67.3408 6.46538 67.9509 5.82025 68.7243 5.35778C69.4977 4.89531 70.3527 4.66602 71.2854 4.66602C72.1287 4.66602 72.8671 4.83313 73.4967 5.16347C74.1263 5.4938 74.6315 5.90575 75.0085 6.39932V4.8409H77.2509V15.5788H75.0085V13.9815C74.6315 14.4868 74.1185 14.9104 73.4695 15.2485C72.8205 15.5866 72.0782 15.7537 71.2465 15.7537C70.3255 15.7537 69.4783 15.5166 68.7127 15.0425C67.9471 14.5684 67.3369 13.9077 66.89 13.0566C66.443 12.2055 66.2176 11.2417 66.2176 10.1613C66.2176 9.08088 66.443 8.12873 66.89 7.29706H66.8939ZM74.5538 8.27253C74.2468 7.72844 73.8504 7.3126 73.3568 7.02502C72.8633 6.74131 72.3308 6.59752 71.7595 6.59752C71.1882 6.59752 70.6558 6.73743 70.1623 7.01724C69.6687 7.29706 69.2684 7.70512 68.9653 8.24532C68.6582 8.78552 68.5067 9.42288 68.5067 10.1652C68.5067 10.9075 68.6582 11.5565 68.9653 12.1122C69.2723 12.6718 69.6726 13.0955 70.1739 13.3869C70.6752 13.6784 71.2038 13.8261 71.7634 13.8261C72.323 13.8261 72.8671 13.6823 73.3607 13.3986C73.8543 13.1149 74.2546 12.6952 74.5577 12.1433C74.8647 11.5914 75.0163 10.9463 75.0163 10.204C75.0163 9.46174 74.8647 8.8205 74.5577 8.27641L74.5538 8.27253Z" fill="white"></path><path d="M89.7416 11.0396H81.5375C81.6036 11.8985 81.9223 12.5863 82.4936 13.1071C83.0649 13.6279 83.7683 13.8883 84.6 13.8883C85.7969 13.8883 86.6403 13.3869 87.1338 12.3881H89.5317C89.2053 13.3753 88.6184 14.1836 87.7673 14.8132C86.9162 15.4428 85.8591 15.7576 84.6 15.7576C83.574 15.7576 82.6529 15.5283 81.8407 15.0658C81.0284 14.6033 80.3911 13.9543 79.9325 13.1188C79.47 12.2793 79.2407 11.3116 79.2407 10.204C79.2407 9.09643 79.4661 8.12873 79.913 7.28928C80.36 6.44984 80.9896 5.80471 81.8018 5.35001C82.614 4.89531 83.5468 4.66602 84.6 4.66602C85.6531 4.66602 86.5159 4.88754 87.3087 5.32669C88.1015 5.76973 88.7195 6.38766 89.1586 7.18824C89.6017 7.98882 89.8193 8.906 89.8193 9.94365C89.8193 10.3478 89.7921 10.7093 89.7416 11.0357V11.0396ZM87.4992 9.24799C87.4875 8.42798 87.1921 7.77508 86.6208 7.28151C86.0496 6.78795 85.3422 6.53922 84.495 6.53922C83.7294 6.53922 83.0726 6.78406 82.5285 7.26985C81.9845 7.75564 81.658 8.41632 81.5531 9.24799H87.4953H87.4992Z" fill="white"></path><path d="M95.3223 5.1246C95.8625 4.81758 96.4999 4.66602 97.2422 4.66602V6.96672H96.6787C95.8081 6.96672 95.1474 7.18824 94.7005 7.6274C94.2536 8.07044 94.0282 8.83604 94.0282 9.9281V15.5788H91.8052V4.8409H94.0282V6.39932C94.3546 5.85523 94.786 5.42774 95.3223 5.1246Z" fill="white"></path><path d="M9.59388 6.15059C7.56134 6.15059 5.91742 7.80228 5.91742 9.83094C5.91742 12.12 7.77508 13.9776 10.0641 13.9776H13.3831V9.42287C13.0916 9.55501 12.769 9.62885 12.427 9.62885C12.1239 9.62885 11.8324 9.57055 11.5681 9.46562V12.1783H9.83872C8.67671 12.1783 7.73233 11.2339 7.73233 10.0719C7.73233 8.90988 8.67671 7.9655 9.83872 7.9655H10.1807C10.1147 7.74787 10.0797 7.51858 10.0797 7.27762C10.0797 6.86956 10.1846 6.48481 10.3673 6.15059H9.59388Z" fill="white"></path><path d="M12.427 8.39689C13.0452 8.39689 13.5463 7.89578 13.5463 7.27763C13.5463 6.65948 13.0452 6.15837 12.427 6.15837C11.8089 6.15837 11.3077 6.65948 11.3077 7.27763C11.3077 7.89578 11.8089 8.39689 12.427 8.39689Z" fill="#26C39F"></path><path d="M14.3818 5.96794C14.6344 6.34103 14.7821 6.79184 14.7821 7.27763C14.7821 7.5147 14.7471 7.74788 14.6811 7.96551H15.4894V16.1851H10.0291C9.4462 16.1851 8.88268 16.1035 8.35025 15.9519C8.22589 16.5932 7.88778 17.1567 7.41365 17.5686C8.22589 17.8484 9.09643 18 10.0019 18H17.3005V5.99515L14.3818 5.96794Z" fill="#BC9CFD"></path><path d="M4.47948 12.7651C4.05587 11.9257 3.81491 10.9774 3.81491 9.97474C3.81491 6.5742 6.57032 3.81491 9.97474 3.81491H11.5681V5.08963C11.8363 4.9847 12.1239 4.9264 12.427 4.9264C12.769 4.9264 13.0916 5.00024 13.383 5.13238V2H9.99806C5.58319 2 2 5.58319 2 9.99806C2 11.4515 2.38863 12.8156 3.06874 13.9932C3.38742 13.4413 3.88098 13.0061 4.47559 12.7651H4.47948Z" fill="#906FFD"></path><path d="M5.54433 17.0129C6.42863 17.0129 7.14549 16.296 7.14549 15.4117C7.14549 14.5274 6.42863 13.8105 5.54433 13.8105C4.66003 13.8105 3.94316 14.5274 3.94316 15.4117C3.94316 16.296 4.66003 17.0129 5.54433 17.0129Z" fill="#26C39F"></path></g><defs><clipPath id="clip0_1735_3775"><rect width="95.2422" height="16" fill="white" transform="translate(2 2)"></rect></clipPath></defs></svg>
  );
}