import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {


  ds: any = {
    "result": {
      "q1": "Explain the bias-variance tradeoff in the context of machine learning models. How can it be addressed?",
      "q2": "Describe the difference between supervised, unsupervised, and reinforcement learning. Provide an example of a real-world application for each.",
      "q3": "What are some common techniques for handling missing data in a dataset? Discuss the advantages and disadvantages of each.",
      "q4": "Explain the concept of feature engineering. Give three examples of feature engineering techniques and when they might be useful.",
      "q5": "How would you approach a classification problem with highly imbalanced classes? Name at least three techniques.",
      "q6": "What are the key differences between precision and recall? When might you prioritize one over the other?",
      "q7": "Describe the process of building a recommendation system. What are some common algorithms used?",
      "q8": "Explain the concept of regularization in machine learning. What are the benefits of using L1 and L2 regularization?",
      "q9": "How would you evaluate the performance of a clustering algorithm? What metrics would you use?",
      "q10": "Discuss the ethical considerations involved in developing and deploying data science models. Provide at least two examples.",
      "q11": "What is overfitting in machine learning? How can it be prevented?",
      "q12": "Explain the differences between bagging and boosting. Provide examples of algorithms that use each technique.",
      "q13": "What is cross-validation, and why is it important in model evaluation?",
      "q14": "Describe the working of a decision tree algorithm. What are its advantages and limitations?",
      "q15": "What is the curse of dimensionality, and how can it affect machine learning models?",
      "q16": "Explain the concept of gradient descent. How does it optimize model parameters?",
      "q17": "What are the differences between parametric and non-parametric models in machine learning?",
      "q18": "Describe the K-Nearest Neighbors (KNN) algorithm. What are its main advantages and disadvantages?",
      "q19": "How does principal component analysis (PCA) help with dimensionality reduction?",
      "q20": "What is the difference between a generative model and a discriminative model? Provide examples of each.",
      "q21": "How would you explain the term 'ensemble learning' to a non-technical person?",
      "q22": "What is the difference between RMSE and MAE? When would you prefer one over the other?",
      "q23": "Describe the architecture and working of a convolutional neural network (CNN). What are CNNs best suited for?",
      "q24": "Explain the differences between batch gradient descent, stochastic gradient descent, and mini-batch gradient descent.",
      "q25": "What is a confusion matrix, and how is it used in evaluating classification models?",
      "q26": "Describe the concept of time series analysis. What are common challenges when working with time series data?",
      "q27": "What is transfer learning? Provide an example of how it can be applied.",
      "q28": "Explain the importance of scaling features in machine learning. What are common scaling techniques?",
      "q29": "What is a ROC curve? How is it useful in evaluating model performance?",
      "q30": "Explain the concept of clustering. What are the differences between hierarchical and k-means clustering?",
      "q31": "What are the trade-offs between using a deep neural network and a simpler machine learning algorithm?",
      "q32": "How do you handle categorical variables in machine learning models? Describe at least three techniques.",
      "q33": "What is an outlier in data, and how would you handle it in a dataset?",
      "q34": "Explain the concept of reinforcement learning. What are its primary components?",
      "q35": "What is a latent variable, and how is it used in machine learning models?",
      "q36": "Describe the difference between type I and type II errors in the context of hypothesis testing.",
      "q37": "What is a heatmap, and how can it be used for exploratory data analysis?",
      "q38": "Explain how decision boundaries are formed in classification algorithms like SVM or logistic regression.",
      "q39": "What are autoencoders, and how are they used in unsupervised learning tasks?",
      "q40": "How can you use SHAP or LIME for model interpretability in machine learning?"
    }
  }
  wb: any = {
    "result": {
      "q1": "Compare and contrast HTML, CSS, and JavaScript in terms of their roles in the rendering pipeline and how they interact to create dynamic, accessible, and performant web applications.",
      "q2": "Explain how the DOM differs from the CSSOM and how both are used together in rendering. How do DOM manipulation and reflows/repaints impact performance?",
      "q3": "Discuss common and less common HTTP methods (GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD). Provide real-world scenarios for each, and explain their implications for caching and idempotency.",
      "q4": "Compare inline, internal, and external CSS in terms of performance, maintainability, and specificity conflicts. In what situations could inline styles be justified in modern applications?",
      "q5": "Explain how responsive design principles adapt layouts for different devices and network conditions. Compare fluid grids, flexible images, and CSS clamp() usage for responsive typography.",
      "q6": "Describe the CSS box model and its interaction with box-sizing. How does changing box-sizing impact layout calculations and prevent unexpected overflow?",
      "q7": "Compare synchronous, asynchronous, and deferred JavaScript execution. How do event loops, microtasks, and macrotasks affect async behavior in browsers?",
      "q8": "What are browser-provided Web APIs versus third-party APIs? Discuss the security implications of using APIs that expose sensitive device features (e.g., Geolocation, Web Bluetooth).",
      "q9": "Analyze the constraints that make an API RESTful. Provide examples of anti-patterns that break REST principles, such as incorrect use of verbs or improper status codes.",
      "q10": "Compare sessionStorage, localStorage, cookies, and IndexedDB in terms of persistence, capacity limits, and security (XSS/CSRF risks). When should each be used?",
      "q11": "Explain advanced usage of CSS media queries, including prefers-color-scheme, prefers-reduced-motion, and high-DPI detection. Provide code examples.",
      "q12": "Compare static, relative, absolute, fixed, and sticky positioning in CSS. How does stacking context influence the z-index behavior in complex layouts?",
      "q13": "Beyond basic definitions, compare GET and POST requests in terms of caching, bookmarking, request payload size, and security implications.",
      "q14": "Explain the CORS preflight process and how browsers enforce the Same-Origin Policy. How can developers securely configure CORS on APIs?",
      "q15": "Compare CSR and SSR in terms of SEO, first contentful paint, and interactivity. How does hydration in SSR frameworks bridge the gap between the two?",
      "q16": "List and explain at least five advanced website performance optimization techniques, including code splitting, tree shaking, and critical CSS inlining.",
      "q17": "Compare CSS Grid and Flexbox for building complex layouts. When might combining them be more effective than using only one?",
      "q18": "Explain the role of version control in CI/CD pipelines. Compare Git with other VCS systems and discuss branching strategies like Gitflow versus trunk-based development.",
      "q19": "Describe the core components of a PWA and how features like background sync and service workers improve resilience in poor network conditions.",
      "q20": "Detail the deployment pipeline for a large-scale application, including build optimization, bundling, minification, testing, and integration with CDNs.",
      "q21": "Compare authentication and authorization in terms of state management in SPAs. How can token expiration and refresh tokens be handled securely?",
      "q22": "Explain how SPAs handle deep linking, browser history, and state persistence. What are the main pitfalls with SEO and analytics in SPAs?",
      "q23": "Compare relational and non-relational databases in terms of scaling strategies, indexing, and data modeling flexibility. Provide real-world use cases for each.",
      "q24": "Explain advanced features of CSS preprocessors like Sass, such as mixins, functions, and control directives. How do they improve maintainability in large teams?",
      "q25": "Discuss the role of WebSockets versus HTTP/2 server push and WebRTC. How do you decide which protocol to use for real-time features?",
      "q26": "Compare frameworks and libraries in terms of control inversion and opinionated design. How might adopting a highly opinionated framework limit flexibility?",
      "q27": "Discuss trade-offs between static and dynamic websites for scalability, personalization, and content freshness. How does JAMstack blur the lines?",
      "q28": "Explain how MVC differs in front-end frameworks versus back-end frameworks. How do modern variations like MVVM and Flux differ?",
      "q29": "Discuss the SEO and accessibility implications of various <meta> tags. How do viewport, robots, and Open Graph tags impact user experience?",
      "q30": "Analyze how CDNs handle edge caching, cache invalidation, and DDoS protection. What are the downsides of relying too heavily on a CDN?",
      "q31": "Discuss how semantic HTML impacts screen reader navigation and SEO ranking algorithms. Provide examples of semantic misuse.",
      "q32": "Compare Web Components with framework-based components (React/Vue). How do Shadow DOM and custom elements impact style encapsulation?",
      "q33": "Discuss WCAG accessibility guidelines and ARIA roles. How would you test for accessibility compliance in a large web project?",
      "q34": "Explain lazy loading for both assets and components. How can improper lazy loading impact SEO and perceived performance?",
      "q35": "Compare inline-block, block, and display: contents in CSS. How can they impact accessibility and DOM structure?",
      "q36": "Explain the difference between bundlers, task runners, and build tools. Compare Webpack, Vite, and Rollup in terms of HMR and output optimization.",
      "q37": "Compare Angular, React, and Vue in terms of learning curve, ecosystem, and rendering performance under heavy data binding.",
      "q38": "Explain the browser's critical rendering path in detail, including how render-blocking resources and preload hints affect it.",
      "q39": "Discuss how TypeScript's type system helps prevent runtime errors. How does it integrate with JavaScript libraries that don't provide type definitions?",
      "q40": "Explain how HTTPS, TLS handshakes, and certificate authorities work together. What are the risks of mixed content on a secure page?"
    }
  }

  bc: any = {
    "result": {
      "q1": "What is blockchain technology, and how does it work?",
      "q2": "Explain the difference between public, private, and consortium blockchains.",
      "q3": "What is a blockchain node, and what roles can nodes perform in a network?",
      "q4": "Describe the concept of a distributed ledger. How does it differ from a traditional database?",
      "q5": "What is a consensus mechanism? Name and explain at least two types.",
      "q6": "What is the purpose of mining in a blockchain? How does it secure the network?",
      "q7": "Explain the difference between proof of work (PoW) and proof of stake (PoS).",
      "q8": "What are smart contracts, and how are they used in blockchain applications?",
      "q9": "What is the difference between Ethereum and Bitcoin blockchains?",
      "q10": "Describe the concept of gas fees in the Ethereum network. Why are they important?",
      "q11": "What are the key components of a blockchain transaction?",
      "q12": "Explain the concept of a hash function in the context of blockchain technology.",
      "q13": "What is a blockchain fork? Differentiate between hard forks and soft forks.",
      "q14": "How does a decentralized application (DApp) differ from a traditional application?",
      "q15": "What is a token in blockchain, and how does it differ from a cryptocurrency?",
      "q16": "Explain the difference between fungible and non-fungible tokens (NFTs). Provide examples.",
      "q17": "What is a wallet in blockchain, and how does it enable secure transactions?",
      "q18": "What is the role of cryptography in blockchain technology?",
      "q19": "Explain the concept of immutability in blockchain. Why is it important?",
      "q20": "What are the main challenges in scaling a blockchain network?",
      "q21": "Describe the concept of a Merkle tree and its importance in blockchain.",
      "q22": "What is the role of governance in blockchain? How is it implemented?",
      "q23": "How does the Lightning Network enhance the scalability of Bitcoin?",
      "q24": "What is the difference between layer 1 and layer 2 blockchain solutions?",
      "q25": "What are zero-knowledge proofs, and how are they used in blockchain?",
      "q26": "Explain the concept of decentralized finance (DeFi). What are its advantages?",
      "q27": "What is an Initial Coin Offering (ICO), and how does it differ from a Security Token Offering (STO)?",
      "q28": "How does blockchain technology ensure data transparency and security?",
      "q29": "What is the role of oracles in blockchain? Provide examples of their use.",
      "q30": "What is the InterPlanetary File System (IPFS), and how does it complement blockchain?",
      "q31": "Explain the concept of blockchain interoperability. Why is it important?",
      "q32": "What are the energy consumption concerns associated with blockchain? How can they be mitigated?",
      "q33": "Describe the difference between on-chain and off-chain transactions.",
      "q34": "What is the role of a genesis block in a blockchain network?",
      "q35": "Explain the difference between hot wallets and cold wallets in blockchain.",
      "q36": "What is a sidechain, and how does it enhance blockchain functionality?",
      "q37": "Describe the use of blockchain in supply chain management.",
      "q38": "What are the benefits and risks of using blockchain for identity management?",
      "q39": "How can blockchain technology improve voting systems?",
      "q40": "What is the role of governance tokens in decentralized organizations (DAOs)?"
    }
  }

  cs: any = {
    "result": {
      "q1": "What is cybersecurity, and why is it important?",
      "q2": "Explain the difference between a vulnerability, a threat, and a risk in cybersecurity.",
      "q3": "What is a firewall, and how does it protect a network?",
      "q4": "Describe the concept of encryption. How is it used to secure data?",
      "q5": "What is the difference between symmetric and asymmetric encryption?",
      "q6": "What are the common types of malware? Provide examples of each.",
      "q7": "What is phishing, and how can organizations prevent it?",
      "q8": "Explain the difference between white-hat, black-hat, and grey-hat hackers.",
      "q9": "What is a Denial-of-Service (DoS) attack? How does it differ from a Distributed Denial-of-Service (DDoS) attack?",
      "q10": "What is the role of intrusion detection systems (IDS) and intrusion prevention systems (IPS)?",
      "q11": "What are the principles of the CIA Triad in cybersecurity?",
      "q12": "What is multi-factor authentication (MFA), and why is it important?",
      "q13": "Describe the concept of zero-trust security. How does it differ from traditional security models?",
      "q14": "What is social engineering in the context of cybersecurity? Provide examples.",
      "q15": "Explain the difference between vulnerability scanning and penetration testing.",
      "q16": "What is ransomware, and how can organizations protect themselves against it?",
      "q17": "What is a VPN, and how does it enhance security for remote users?",
      "q18": "What are the common methods of securing web applications from attacks like SQL injection?",
      "q19": "Explain the concept of a man-in-the-middle (MITM) attack and how it can be prevented.",
      "q20": "What is a security incident, and how should organizations respond to it?",
      "q21": "What is the importance of security patches, and how should they be managed?",
      "q22": "What is the difference between blacklisting and whitelisting in cybersecurity?",
      "q23": "Explain the role of public key infrastructure (PKI) in securing communications.",
      "q24": "What are some best practices for securing passwords?",
      "q25": "What is data exfiltration, and how can organizations prevent it?",
      "q26": "What is the General Data Protection Regulation (GDPR), and how does it impact cybersecurity?",
      "q27": "What is the role of ethical hacking in cybersecurity?",
      "q28": "Explain the concept of endpoint security and its importance in modern IT environments.",
      "q29": "What are honeypots, and how are they used in cybersecurity?",
      "q30": "What is the difference between a security policy and a security procedure?",
      "q31": "Describe the concept of network segmentation. How does it enhance security?",
      "q32": "What is the importance of logging and monitoring in cybersecurity?",
      "q33": "Explain the concept of privilege escalation in cybersecurity attacks.",
      "q34": "What is a cybersecurity framework? Name and briefly describe one widely used framework.",
      "q35": "What is a brute-force attack, and how can it be mitigated?",
      "q36": "What are insider threats, and how can organizations mitigate them?",
      "q37": "Explain the concept of social media security and why it is important for individuals and organizations.",
      "q38": "What is a zero-day vulnerability, and why is it a significant security concern?",
      "q39": "What are the challenges of securing IoT devices, and how can they be addressed?",
      "q40": "What is the role of cybersecurity in protecting critical infrastructure?"
    }
  }
  vlsi: any = {
    "result": {
      "q1": "What is VLSI, and how does it differ from other IC design techniques?",
      "q2": "Explain the difference between analog and digital VLSI design.",
      "q3": "What are the main steps involved in the VLSI design flow?",
      "q4": "What is Moore’s Law, and how does it impact VLSI design?",
      "q5": "Explain the concept of RTL (Register Transfer Level) in VLSI.",
      "q6": "What is the significance of CMOS technology in VLSI design?",
      "q7": "What are the advantages and disadvantages of using FPGA for VLSI design?",
      "q8": "Explain the role of Verilog and VHDL in VLSI design.",
      "q9": "What are the key challenges in designing low-power VLSI circuits?",
      "q10": "How does parasitic capacitance affect VLSI circuit performance?",
      "q11": "Explain the difference between ASIC and FPGA in VLSI design.",
      "q12": "What is the role of SPICE in VLSI circuit simulation?",
      "q13": "What are the main factors to consider during the physical design stage of VLSI?",
      "q14": "Explain the concept of clock tree synthesis (CTS) in VLSI.",
      "q15": "What is Design for Testability (DFT) in VLSI, and why is it important?",
      "q16": "How do setup time and hold time affect the functionality of a VLSI circuit?",
      "q17": "What is a standard cell library in VLSI design?",
      "q18": "Explain the concept of delay modeling in VLSI circuits.",
      "q19": "What are the different types of power dissipation in VLSI circuits?",
      "q20": "What is the importance of place-and-route in the VLSI design process?"
    }
  };

  wireless: any = {
    "result": {
      "q1": "What is wireless communication, and how does it work?",
      "q2": "Explain the difference between licensed and unlicensed frequency bands in wireless communication.",
      "q3": "What are the different types of wireless communication systems?",
      "q4": "What is the role of modulation in wireless communication?",
      "q5": "Explain the concept of cellular networks and their architecture.",
      "q6": "What is the difference between 4G and 5G wireless technologies?",
      "q7": "What is the significance of the frequency spectrum in wireless communication?",
      "q8": "How does Multiple Input Multiple Output (MIMO) improve wireless communication?",
      "q9": "What are the advantages and disadvantages of wireless communication compared to wired communication?",
      "q10": "What is Bluetooth technology, and how does it differ from Wi-Fi?",
      "q11": "Explain the concept of signal-to-noise ratio (SNR) in wireless communication.",
      "q12": "What are the key challenges in ensuring security in wireless communication?",
      "q13": "What is the role of antennas in wireless communication?",
      "q14": "Explain the concept of handoff in cellular networks.",
      "q15": "What is spread spectrum technology, and why is it used in wireless communication?",
      "q16": "What are the different types of fading in wireless communication, and how are they mitigated?",
      "q17": "What is Orthogonal Frequency Division Multiplexing (OFDM), and why is it important in wireless systems?",
      "q18": "Explain the concept of latency in wireless networks and its impact on performance.",
      "q19": "What is Near Field Communication (NFC), and how is it used in wireless communication?",
      "q20": "What is the Internet of Things (IoT), and how does it leverage wireless communication?"
    }
  };
  optical: any = {
    "result": {
      "q1": "What is optical communication, and how does it differ from traditional communication systems?",
      "q2": "What is the role of optical fibers in optical communication systems?",
      "q3": "Explain the principle of light propagation in optical fibers using total internal reflection.",
      "q4": "What are the differences between single-mode and multi-mode optical fibers?",
      "q5": "What is wavelength-division multiplexing (WDM), and how is it used in optical communication?",
      "q6": "Describe the concept of optical amplification and its importance in long-distance communication.",
      "q7": "What are the primary causes of signal attenuation in optical fibers, and how can they be minimized?",
      "q8": "What is dispersion in optical communication, and how does it affect data transmission?",
      "q9": "Explain the role of laser diodes and light-emitting diodes (LEDs) in optical communication systems.",
      "q10": "What are the advantages of optical communication over other types of communication technologies?",
      "q11": "What is the function of an optical transceiver in communication systems?",
      "q12": "Describe the challenges of integrating optical communication with existing network infrastructures.",
      "q13": "What are photonic integrated circuits (PICs), and how do they enhance optical communication?",
      "q14": "Explain the concept of nonlinear effects in optical fibers and their impact on signal quality.",
      "q15": "What is free-space optical communication, and how does it differ from fiber-optic communication?",
      "q16": "How does the use of erbium-doped fiber amplifiers (EDFAs) improve optical networks?",
      "q17": "What are the differences between coherent and non-coherent optical communication systems?",
      "q18": "Explain the importance of optical switches and routers in optical communication networks.",
      "q19": "What are the key security considerations in optical communication?",
      "q20": "What is the future of optical communication technology, and how is it evolving?"
    }
  };

  microelectronics: any = {
    "result": {
      "q1": "What is microelectronics, and how does it differ from conventional electronics?",
      "q2": "Explain the role of semiconductors in microelectronics.",
      "q3": "What are integrated circuits (ICs), and why are they significant in microelectronics?",
      "q4": "Describe the fabrication process of a semiconductor device.",
      "q5": "What are the key differences between analog and digital ICs?",
      "q6": "What is Moore's Law, and how does it relate to advancements in microelectronics?",
      "q7": "Explain the concept of Very Large Scale Integration (VLSI) and its impact on microelectronics.",
      "q8": "What are the functions of diodes and transistors in microelectronic circuits?",
      "q9": "Describe the process of doping in semiconductors and its importance.",
      "q10": "What is the role of photolithography in the fabrication of microelectronic devices?",
      "q11": "Explain the concept of complementary metal-oxide-semiconductor (CMOS) technology.",
      "q12": "What are microelectromechanical systems (MEMS), and how are they used in microelectronics?",
      "q13": "What is the significance of power management ICs in modern electronics?",
      "q14": "What are the challenges associated with heat dissipation in microelectronic devices?",
      "q15": "Explain the concept of System-on-Chip (SoC) and its applications.",
      "q16": "What are the differences between planar and FinFET transistor architectures?",
      "q17": "Describe the importance of nanoelectronics in the future of microelectronics.",
      "q18": "What is the impact of quantum mechanics on microelectronics design and development?",
      "q19": "Explain the significance of packaging and interconnects in microelectronic devices.",
      "q20": "What are the current trends and future challenges in microelectronics technology?"
    }
  };
  private apiUrl = environment.apis.primary;
  private apiUrl2 = environment.apis.secondary;

  private questionsData: any;
  constructor(private http: HttpClient) {
  }

  ping(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl2}/company/ping`);
  }

  // private getHeaders(): HttpHeaders {
  //   return new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  // }
  // http://localhost:8080/api/questions/get-question?domain=Java&subdomain=Streams
  getQuestions(domain: string, subdomain: string): Observable<any> {
    let params = new HttpParams()
      .set('domain', domain)
      .set('subdomain', subdomain);
    return this.http.get<any>(`${this.apiUrl2}/questions/get-question`, { params });
  }

  getFeedback(question: string, answer: string): Observable<any> {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();
    const userId = localStorage.getItem("id")
    if (userId === null) {
      const payload = {
        question,
        answer,
        // date: formattedDate,
        userId: 9999
      };
      console.log(payload);
      return this.http.post<any>(`${this.apiUrl2}/questions/feedback`, payload);
    }
    else {
      const payload = {
        question,
        answer,
        // date: formattedDate,
        userId
      };
      console.log(payload);
      return this.http.post<any>(`${this.apiUrl2}/questions/feedback`, payload);
    }

  }

  setQuestions(questions: any) {
    this.questionsData = questions;
  }
  getDefaultQuestions(domain: string) {
    let questions: any;
    console.log(domain)
    switch (domain) {
      case 'Web Development':
        questions = this.wb;
        break;
      case 'Data Science':
        questions = this.ds;
        break;
      case 'Block Chain':
        questions = this.bc;
        break;
      case 'Cyber Security':
        questions = this.cs;
        break;
      case 'VLSI Design':
        questions = this.vlsi;
        break;
      case 'Wireless Communication':
        questions = this.wireless;
        break;
      case 'Optical Communication':
        questions = this.optical;
        break;
      case 'Microelectronics':
        questions = this.microelectronics;
        break;
      default:
        console.error(`No questions found for the domain: ${domain}`);
        return;
    }
    return questions;
  }
}
