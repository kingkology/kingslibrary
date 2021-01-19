<?php 
// use * under allow access control origin because we will not be accepting any api key using tokens or authorisations
header("Access-Control-Allow-Origin:*");
//content type as html
header("Content-Type:application/html");


// set response code - 200 ok
http_response_code(200);
?>
	<!-- image card row starts here -->
	            <div class="row">
	              <div class="col-sm-4 stretch-card grid-margin">
	                <div class="card">
	                  <div class="card-body p-0">
	                    <img class="img-fluid w-100" src="../assets/images/dashboard/img_1.jpg" alt="" />
	                  </div>
	                  <div class="card-body px-3 text-dark">
	                    <div class="d-flex justify-content-between">
	                      <p class="text-muted font-13 mb-0">ENTIRE APARTMENT</p>
	                      <i class="mdi mdi-heart-outline"></i>
	                    </div>
	                    <h5 class="font-weight-semibold"> Cosy Studio flat in London </h5>
	                    <div class="d-flex justify-content-between font-weight-semibold">
	                      <p class="mb-0">
	                        <i class="mdi mdi-star star-color pr-1"></i>4.60 (35) </p>
	                      <p class="mb-0">$5,267/night</p>
	                    </div>
	                  </div>
	                </div>
	              </div>
	              <div class="col-sm-4 stretch-card grid-margin">
	                <div class="card">
	                  <div class="card-body p-0">
	                    <img class="img-fluid w-100" src="../assets/images/dashboard/img_2.jpg" alt="" />
	                  </div>
	                  <div class="card-body px-3 text-dark">
	                    <div class="d-flex justify-content-between">
	                      <p class="text-muted font-13 mb-0">ENTIRE APARTMENT</p>
	                      <i class="mdi mdi-heart-outline"></i>
	                    </div>
	                    <h5 class="font-weight-semibold"> Victoria Bedsit Studio Ensuite </h5>
	                    <div class="d-flex justify-content-between font-weight-semibold">
	                      <p class="mb-0">
	                        <i class="mdi mdi-star star-color pr-1"></i>4.83 (12) </p>
	                      <p class="mb-0">$6,144/night</p>
	                    </div>
	                  </div>
	                </div>
	              </div>
	              <div class="col-sm-4 stretch-card grid-margin">
	                <div class="card">
	                  <div class="card-body p-0">
	                    <img class="img-fluid w-100" src="../assets/images/dashboard/img_3.jpg" alt="" />
	                  </div>
	                  <div class="card-body px-3 text-dark">
	                    <div class="d-flex justify-content-between">
	                      <p class="text-muted font-13 mb-0">ENTIRE APARTMENT</p>
	                      <i class="mdi mdi-heart-outline"></i>
	                    </div>
	                    <h5 class="font-weight-semibold">Fabulous Huge Room</h5>
	                    <div class="d-flex justify-content-between font-weight-semibold">
	                      <p class="mb-0">
	                        <i class="mdi mdi-star star-color pr-1"></i>3.83 (15) </p>
	                      <p class="mb-0">$5,267/night</p>
	                    </div>
	                  </div>
	                </div>
	              </div>
	            </div>
	            <!-- table row starts here -->
	            <div class="row">
	              <div class="col-xl-4 grid-margin">
	                <div class="card card-stat stretch-card mb-3">
	                  <div class="card-body">
	                    <div class="d-flex justify-content-between">
	                      <div class="text-white">
	                        <h3 class="font-weight-bold mb-0">$168.90</h3>
	                        <h6>This Month</h6>
	                        <div class="badge badge-danger">23%</div>
	                      </div>
	                      <div class="flot-bar-wrapper">
	                        <div id="column-chart" class="flot-chart"></div>
	                      </div>
	                    </div>
	                  </div>
	                </div>
	                <div class="card stretch-card mb-3">
	                  <div class="card-body d-flex flex-wrap justify-content-between">
	                    <div>
	                      <h4 class="font-weight-semibold mb-1 text-black"> Member Profit </h4>
	                      <h6 class="text-muted">Average Weekly Profit</h6>
	                    </div>
	                    <h3 class="text-success font-weight-bold">+168.900</h3>
	                  </div>
	                </div>
	                <div class="card stretch-card mb-3">
	                  <div class="card-body d-flex flex-wrap justify-content-between">
	                    <div>
	                      <h4 class="font-weight-semibold mb-1 text-black"> Total Profit </h4>
	                      <h6 class="text-muted">Weekly Customer Orders</h6>
	                    </div>
	                    <h3 class="text-success font-weight-bold">+6890.00</h3>
	                  </div>
	                </div>
	                <div class="card mt-3">
	                  <div class="card-body d-flex flex-wrap justify-content-between">
	                    <div>
	                      <h4 class="font-weight-semibold mb-1 text-black"> Issue Reports </h4>
	                      <h6 class="text-muted">System bugs and issues</h6>
	                    </div>
	                    <h3 class="text-danger font-weight-bold">-8380.00</h3>
	                  </div>
	                </div>
	              </div>
	              <div class="col-xl-8 stretch-card grid-margin">
	                <div class="card">
	                  <div class="card-body pb-0">
	                    <h4 class="card-title mb-0">Financial management review</h4>
	                  </div>
	                  <div class="card-body p-0">
	                    <div class="table-responsive">
	                      <table class="table custom-table text-dark">
	                        <thead>
	                          <tr>
	                            <th>Name</th>
	                            <th>Sale Rate</th>
	                            <th>Actual</th>
	                            <th>Variance</th>
	                          </tr>
	                        </thead>
	                        <tbody>
	                          <tr>
	                            <td>
	                              <img src="../assets/images/faces/face2.jpg" class="mr-2" alt="image" /> Jacob Jensen </td>
	                            <td>
	                              <div class="d-flex">
	                                <span class="pr-2 d-flex align-items-center">85%</span>
	                                <select id="star-1" name="rating" autocomplete="off">
	                                  <option value="1">1</option>
	                                  <option value="2">2</option>
	                                  <option value="3">3</option>
	                                  <option value="4">4</option>
	                                  <option value="5">5</option>
	                                </select>
	                              </div>
	                            </td>
	                            <td>32,435</td>
	                            <td>40,234</td>
	                          </tr>
	                          <tr>
	                            <td>
	                              <img src="../assets/images/faces/face3.jpg" class="mr-2" alt="image" /> Cecelia Bradley </td>
	                            <td>
	                              <div class="d-flex">
	                                <span class="pr-2 d-flex align-items-center">55%</span>
	                                <select id="star-2" name="rating" autocomplete="off">
	                                  <option value="1">1</option>
	                                  <option value="2">2</option>
	                                  <option value="3">3</option>
	                                  <option value="4">4</option>
	                                  <option value="5">5</option>
	                                </select>
	                              </div>
	                            </td>
	                            <td>4,36780</td>
	                            <td>765728</td>
	                          </tr>
	                          <tr>
	                            <td>
	                              <img src="../assets/images/faces/face4.jpg" class="mr-2" alt="image" /> Leah Sherman </td>
	                            <td>
	                              <div class="d-flex">
	                                <span class="pr-2 d-flex align-items-center">23%</span>
	                                <select id="star-3" name="rating" autocomplete="off">
	                                  <option value="1">1</option>
	                                  <option value="2">2</option>
	                                  <option value="3">3</option>
	                                  <option value="4">4</option>
	                                  <option value="5">5</option>
	                                </select>
	                              </div>
	                            </td>
	                            <td>2300</td>
	                            <td>22437</td>
	                          </tr>
	                          <tr>
	                            <td>
	                              <img src="../assets/images/faces/face5.jpg" class="mr-2" alt="image" /> Ina Curry </td>
	                            <td>
	                              <div class="d-flex">
	                                <span class="pr-2 d-flex align-items-center">44%</span>
	                                <select id="star-4" name="rating" autocomplete="off">
	                                  <option value="1">1</option>
	                                  <option value="2">2</option>
	                                  <option value="3">3</option>
	                                  <option value="4">4</option>
	                                  <option value="5">5</option>
	                                </select>
	                              </div>
	                            </td>
	                            <td>53462</td>
	                            <td>1,75938</td>
	                          </tr>
	                          <tr>
	                            <td>
	                              <img src="../assets/images/faces/face7.jpg" class="mr-2" alt="image" /> Lida Fitzgerald </td>
	                            <td>
	                              <div class="d-flex">
	                                <span class="pr-2 d-flex align-items-center">65%</span>
	                                <select id="star-5" name="rating" autocomplete="off">
	                                  <option value="1">1</option>
	                                  <option value="2">2</option>
	                                  <option value="3">3</option>
	                                  <option value="4">4</option>
	                                  <option value="5">5</option>
	                                </select>
	                              </div>
	                            </td>
	                            <td>67453</td>
	                            <td>765377</td>
	                          </tr>
	                          <tr>
	                            <td>
	                              <img src="../assets/images/faces/face2.jpg" class="mr-2" alt="image" /> Stella Johnson </td>
	                            <td>
	                              <div class="d-flex">
	                                <span class="pr-2 d-flex align-items-center">49%</span>
	                                <select id="star-6" name="rating" autocomplete="off">
	                                  <option value="1">1</option>
	                                  <option value="2">2</option>
	                                  <option value="3">3</option>
	                                  <option value="4">4</option>
	                                  <option value="5">5</option>
	                                </select>
	                              </div>
	                            </td>
	                            <td>43662</td>
	                            <td>96535</td>
	                          </tr>
	                          <tr>
	                            <td>
	                              <img src="../assets/images/faces/face9.jpg" class="mr-2" alt="image" /> Maria Ortiz </td>
	                            <td>
	                              <div class="d-flex">
	                                <span class="pr-2 d-flex align-items-center">65%</span>
	                                <select id="star-7" name="rating" autocomplete="off">
	                                  <option value="1">1</option>
	                                  <option value="2">2</option>
	                                  <option value="3">3</option>
	                                  <option value="4">4</option>
	                                  <option value="5">5</option>
	                                </select>
	                              </div>
	                            </td>
	                            <td>76555</td>
	                            <td>258546</td>
	                          </tr>
	                        </tbody>
	                      </table>
	                    </div>
	                    <a class="text-black font-13 d-block pt-2 pb-2 pb-lg-0 font-weight-bold pl-4" href="#">Show more</a>
	                  </div>
	                </div>
	              </div>
	            </div>

<?php
?>