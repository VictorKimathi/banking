import HeaderBox from '@/components/HeaderBox'
import RecentTransactions from '@/components/RecentTransactions';
import Recommendation from '@/components/Recommendation';
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';

const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  // const loggedIn = await getLoggedInUser();
  // const accounts = await getAccounts({ 
    // userId: loggedIn.$id 
    
  // })


  const loggedIn = { firstName:"Victor", lastName:"Codes",email:"victorcodes9532@gmail.com"}

  // if(!accounts) return;
  
  // const accountsData = accounts?.data;
  // const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  // const account = await getAccount({ appwriteItemId })

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          {/* //welcome Victor  */}
          <HeaderBox 
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || 'Guest'}
            subtext="Access and manage your account and transactions efficiently."
          />

          {/* <TotalBalanceBox 
            accounts={accountsData}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          /> */}



          <TotalBalanceBox 
            accounts={[]}     
            totalBanks={1}
            totalCurrentBalance={5000000.351}
          />
          <Recommendation />
        </header>

      {/* <RecentTransactions 
          accounts={accountsData}                   
          transactions={account?.transactions}
          appwriteItemId={appwriteItemId}
          page={currentPage}
        /> */}
      </div>
      {/* Right side bar is used only in the root page  */}
      {/* <RightSidebar 
        user={loggedIn}
        transactions={account?.transactions}
        banks={accountsData?.slice(0, 2)}
      /> */}


      

      <RightSidebar 
        user={loggedIn}
        transactions={[]}
        banks={[{currentBalance:1250.33},{currentBalance:1250.33}]}
      />
    </section>
  )
}

export default Home