import ConversationsList from "../../components/ConversationsList";
import "./Inbox.css";
import { Send } from "react-bootstrap-icons";

function Inbox() {
  return (
    <div class="main-wrapper">
      <div class="page-content">
        <div class="row m-0">
          <div class="col-md-4 col-12 card-stacked">
            <div class="bgc-body chat px-0">
              <div class="chat-user-detail">
                <div class="p-3 chat-user-info">
                  <div class="card-body text-center">
                    <a href="#!">
                      <img
                        src="https://user-images.githubusercontent.com/35243461/168796876-2e363a49-b32c-4218-b5a3-ce12493af69e.jpg"
                        class="rounded-circle img-fluid shadow avatar-xxl"
                      />
                    </a>
                    <div class="pt-4 text-center animate4">
                      <h6 class="fw-300 mb-1">Quan Albert</h6>
                      <p class="text-lighter">Web Developer</p>
                      <div class="mt-4">
                        <a
                          href="#"
                          class="btn btn-light-skype btn-icon btn-circle btn-sm btn-shadow mr-2"
                        >
                          <i class="bx bxl-skype"></i>
                        </a>
                        <a
                          href="#"
                          class="btn btn-light-facebook btn-icon btn-circle btn-sm btn-shadow mr-2"
                        >
                          <i class="bx bxl-facebook"></i>
                        </a>
                        <a
                          href="#"
                          class="btn btn-light-twitter btn-icon btn-circle btn-sm btn-shadow mr-2"
                        >
                          <i class="bx bxl-twitter"></i>
                        </a>
                        <a
                          href="#"
                          class="btn btn-light-instagram btn-icon btn-circle btn-sm btn-shadow mr-2"
                        >
                          <i class="bx bxl-instagram"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="px-2 pb-3 pt-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search a conversation"
                />
              </div>

              <ConversationsList />
            </div>
          </div>
          <div class="col-md-8 col-12 card-stacked">
            <div class="bgc-body chat chat-panel w-100">
              <div class="p-3 chat-header">
                <div class="d-flex">
                  <div class="w-100 d-flex pl-0">
                    <img
                      class="rounded-circle avatar-sm mr-3 chat-profile-picture"
                      src="https://user-images.githubusercontent.com/35243461/168796872-7251e655-cdf0-4031-a253-bf0db09cdf0f.jpg"
                    />
                    <div class="mr-3 ps-2">
                      <a href="!#">
                        <p class="fw-400 mb-0">Trae Dungy</p>
                      </a>
                      <p class="sub-caption text-lighter text-small mb-0">
                        <i class="la la-clock mr-1"></i>last seen today at 09:15
                        PM
                      </p>
                    </div>
                  </div>
                  <div class="flex-shrink-0 margin-auto">
                    <a
                      href="#"
                      class="btn ml-2"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="15"
                        height="15"
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                      </svg>
                    </a>
                    <a
                      href="#"
                      class="btn ml-2"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="15"
                        height="15"
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather"
                      >
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      </svg>
                    </a>
                    <a
                      href="#"
                      class="btn ml-2"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="15"
                        height="15"
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather"
                      >
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="12" cy="5" r="1"></circle>
                        <circle cx="12" cy="19" r="1"></circle>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              <div class="d-flex flex-row navigation-mobile scrollable-chat-panel chat-panel-scroll">
                <div class="w-100 p-3">
                  <div class="left-chat-message fs-13 mb-2">
                    <p class="mb-0 mr-3 pe-5">Hi, Quan</p>
                    <div class="message-options">
                      <div class="message-time">06:15</div>
                      <div class="message-arrow">
                        <i class="text-lighter la la-angle-down fs-17"></i>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex flex-row-reverse mb-2">
                    <div class="right-chat-message fs-13 mb-2">
                      <div class="mb-0 mr-3 pe-5">
                        <div class="d-flex flex-row">
                          <div class="me-5">Hey, Beate</div>
                          <div class="pr-4"></div>
                        </div>
                      </div>
                      <div class="message-options dark">
                        <div class="message-time">
                          <div class="d-flex flex-row">
                            <div class="pe-2">06:49</div>
                            <div class="svg15 double-check"></div>
                          </div>
                        </div>
                        <div class="message-arrow">
                          <i class="text-lighter la la-angle-down fs-17"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="left-chat-message fs-13 mb-2">
                    <p class="mb-0 mr-3 pe-5">
                      Oh hey, I didn’t see you there. Did you already get a
                      table?
                    </p>
                    <div class="message-options">
                      <div class="message-time">06:52</div>
                      <div class="message-arrow">
                        <i class="text-lighter la la-angle-down fs-17"></i>
                      </div>
                    </div>
                  </div>
                  <div class="left-chat-message fs-13 mb-2">
                    <p class="mb-0 mr-3 pe-5">I just want to ask</p>
                    <div class="message-options">
                      <div class="message-time">06:53</div>
                      <div class="message-arrow">
                        <i class="text-lighter la la-angle-down fs-17"></i>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex flex-row-reverse mb-2">
                    <div class="right-chat-message fs-13 mb-2">
                      <div class="mb-0 mr-3 pe-5">
                        <div class="d-flex flex-row">
                          <div class="me-5">Yeah, right over here.</div>
                          <div class="pr-4"></div>
                        </div>
                      </div>
                      <div class="message-options dark">
                        <div class="message-time">
                          <div class="d-flex flex-row">
                            <div class="pe-2">06:53</div>
                            <div class="svg15 double-check"></div>
                          </div>
                        </div>
                        <div class="message-arrow">
                          <i class="text-lighter la la-angle-down fs-17"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="left-chat-message fs-13 mb-2">
                    <p class="mb-0 mr-3 pe-5">
                      I’m glad we had time to meet up.
                    </p>
                    <div class="message-options">
                      <div class="message-time">06:54</div>
                      <div class="message-arrow">
                        <i class="text-lighter la la-angle-down fs-17"></i>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex flex-row-reverse mb-2">
                    <div class="right-chat-message fs-13 mb-2">
                      <div class="mb-0 mr-3 pe-5">
                        <div class="d-flex flex-row">
                          <div class="me-5">;)</div>
                          <div class="pr-4"></div>
                        </div>
                      </div>
                      <div class="message-options dark">
                        <div class="message-time">
                          <div class="d-flex flex-row">
                            <div class="pe-2">06:57</div>
                            <div class="svg15 double-check"></div>
                          </div>
                        </div>
                        <div class="message-arrow">
                          <i class="text-lighter la la-angle-down fs-17"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex flex-row-reverse mb-2">
                    <div class="right-chat-message fs-13 mb-2">
                      <div class="mb-0 mr-3 pe-5">
                        <div class="d-flex flex-row">
                          <div class="pr-4">Me too. So, what’s going on?</div>
                          <div class="pr-4"></div>
                        </div>
                      </div>
                      <div class="message-options dark">
                        <div class="message-time">
                          <div class="d-flex flex-row">
                            <div class="pe-2">06:57</div>
                            <div class="svg15 double-check"></div>
                          </div>
                        </div>
                        <div class="message-arrow">
                          <i class="text-lighter la la-angle-down fs-17"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="left-chat-message fs-13 mb-2">
                    <p class="mb-0 mr-3 pe-5">Oh, not much. You?</p>
                    <div class="message-options">
                      <div class="message-time">07:05</div>
                      <div class="message-arrow">
                        <i class="text-lighter la la-angle-down fs-17"></i>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex flex-row-reverse mb-2">
                    <div class="right-chat-message fs-13 mb-2">
                      <div class="d-flex flex-row">
                        <div class="me-5">
                          Not much. Hey, how did your interview go? Wasn’t that
                          today?
                        </div>
                        <div class="pr-4"></div>
                      </div>
                      <div class="message-options dark">
                        <div class="message-time">
                          <div class="d-flex flex-row">
                            <div class="pe-2">07:06</div>
                            <div class="svg15 double-check"></div>
                          </div>
                        </div>
                        <div class="message-arrow">
                          <i class="text-lighter la la-angle-down fs-17"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="left-chat-message fs-13 mb-2">
                    <p class="mb-0 mr-3 pe-5">
                      Oh, yeah. I think it went well. I don’t know if I got the
                      job yet, but they said they would call in a few days.
                    </p>
                    <div class="message-options">
                      <div class="message-time">07:09</div>
                      <div class="message-arrow">
                        <i class="text-lighter la la-angle-down fs-17"></i>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex flex-row-reverse mb-2">
                    <div class="right-chat-message fs-13 mb-2">
                      <div class="mb-0 mr-3 pe-5">
                        <div class="d-flex flex-row">
                          <div class="me-5">
                            Well, I’m sure you did great. Good luck.
                          </div>
                          <div class="pr-4"></div>
                        </div>
                      </div>
                      <div class="message-options dark">
                        <div class="message-time">
                          <div class="d-flex flex-row">
                            <div class="pe-2">07:12</div>
                            <div class="svg15 double-check"></div>
                          </div>
                        </div>
                        <div class="message-arrow">
                          <i class="text-lighter la la-angle-down fs-17"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="left-chat-message fs-13 mb-2">
                    <p class="mb-0 mr-3 pe-5">
                      Thanks. I’m just happy that it’s over. I was really
                      nervous about it.
                    </p>
                    <div class="message-options">
                      <div class="message-time">07:16</div>
                      <div class="message-arrow">
                        <i class="text-lighter la la-angle-down fs-17"></i>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex flex-row-reverse mb-2">
                    <div class="right-chat-message fs-13 mb-2">
                      <div class="d-flex flex-row">
                        <div class="me-5">
                          I can understand that. I get nervous before
                          interviews, too
                        </div>
                        <div class="pr-4"></div>
                      </div>
                      <div class="message-options dark">
                        <div class="message-time">
                          <div class="d-flex flex-row">
                            <div class="pe-2">07:21</div>
                            <div class="svg15 double-check"></div>
                          </div>
                        </div>
                        <div class="message-arrow">
                          <i class="text-lighter la la-angle-down fs-17"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="left-chat-message fs-13 mb-2">
                    <p class="mb-0 mr-3 pe-5">
                      Well, thanks for being supportive. I appreciate it.
                    </p>
                    <div class="message-options">
                      <div class="message-time">07:24</div>
                      <div class="message-arrow">
                        <i class="text-lighter la la-angle-down fs-17"></i>
                      </div>
                    </div>
                  </div>
                  <div class="left-chat-message fs-13 mb-2">
                    <p class="mb-0 mr-3 pe-5">
                      Hey Quan, If you are free now we can meet tonight ?
                    </p>
                    <div class="message-options">
                      <div class="message-time">08:21</div>
                      <div class="message-arrow">
                        <i class="text-lighter la la-angle-down fs-17"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="chat-search ps-4">
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Write a message"
                  />
                  <div class="input-group-append btn btn-primary px-2 d-flex align-items-center justify-content-center">
                    <Send />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inbox;
