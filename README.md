## Strava

获取数据

1. Get authorization code from authorization page. This is a one time, manual step.
   Paste the below code in a browser, hit enter then grab the "code" part from the resulting url.

https://www.strava.com/oauth/authorize?client_id=your_client_id&redirect_uri=http://localhost&response_type=code&scope=activity:read_all

2. Exchange authorization code for access token & refresh token

https://www.strava.com/oauth/token?client_id=your_client_id&client_secret=your_client_secret&code=your_code_from_previous_step&grant_type=authorization_code

3. View your activities using the access token just received

https://www.strava.com/api/v3/athlete/activities?access_token=access_token_from_previous_step

3. Use refresh token to get new access tokens

https://www.strava.com/oauth/token?client_id=your_client_id&client_secret=your_client_secret&refresh_token=your_refresh_token_from_previous_step&grant_type=refresh_token

## MapBox

可视化展示

## 参考项目：

- 批量获取 GPX 数据：https://github.com/PhysicsDan/GPXfromStravaAPI

- 前端设计等：https://github.com/yihong0618/running_page
