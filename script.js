
const root=document.getElementById('fuller-preview');
const menu=root.querySelector('.fp-menu'),links=root.querySelector('.fp-links');
menu.addEventListener('click',()=>{const open=links.classList.toggle('fp-open');menu.setAttribute('aria-expanded',String(open));});
links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('fp-open');menu.setAttribute('aria-expanded','false');}));
root.querySelector('form').addEventListener('submit',e=>{e.preventDefault();const data=new FormData(e.target);const body=['Name: '+data.get('name'),'Email: '+data.get('email'),'Phone: '+(data.get('phone')||'Not provided'),'Postcode: '+(data.get('postcode')||'Not provided'),'Service: '+data.get('service'),'','Job details:',data.get('message')].join('\n');window.location.href='mailto:tristan@fuller-pm.co.uk?subject='+encodeURIComponent('Website quotation enquiry')+'&body='+encodeURIComponent(body);root.querySelector('.fp-status').textContent='Your email app should open with a draft. Please press Send there. If it does not open, email tristan@fuller-pm.co.uk directly.';});
