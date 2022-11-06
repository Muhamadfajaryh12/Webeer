import {
  DetailJobsSkeleton,
  createItemJob,
  createDetailJob,
} from '../templates/template-creator';
import JobSource from '../../data/jobSource';

const jobsPage = {
  async render() {
    return `
        <div id="container-page-jobs">
            <search-bar></search-bar>
            <div class="container-jobs">
                <div class="item-jobs">
                    ${DetailJobsSkeleton(10)}
                </div>
                <div class="detail-jobs" id="detail">
                    <div class="card">
                        <img src="./asset/hero-jobsDetail.png">
                        <p> Temukan pekerjaan sesuai dengan passion kamu </p>
                    </div>
                </div>
            </div>
        </div>
        `;
  },
  async afterRender() {
    const job = await JobSource.getJobs();
    const jobItemContainer = document.querySelector('.item-jobs');
    jobItemContainer.innerHTML = '';
    job.data.data.forEach((jobs) => {
      jobItemContainer.innerHTML += createItemJob(jobs);
    });
    console.log(job.data.data);

    const search = document.querySelector('.searchBar');
    const inputSearch = document.querySelector('#searchInput');
    search.addEventListener('submit', async (event) => {
      event.preventDefault;
      const getInputSearch = inputSearch.value;
      console.log(getInputSearch);
      const getSearch = await JobSource.getJobsSearch(getInputSearch);
      console.log(getSearch);
      getSearch.data.data.forEach((jobs) => {
        jobItemContainer.innerHTML += createItemJob(jobs);
      });
    });

    const btn = document.querySelectorAll('.btn-detail');
    console.log(btn);
    for (let i = 0; i < btn.length; i++) {
      btn[i].addEventListener('click', async () => {
        const test = btn[i].value;
        console.log(test);
        const detail = await JobSource.getJobsDetail(test);
        console.log(detail);
        const jobDetailContainer = document.querySelector('.card');
        jobDetailContainer.innerHTML = createDetailJob(detail.data.data);
      });
    }
  },
};
export default jobsPage;
