insert into
  public."Post"
values
  (
    '97ced22e-f3cf-50c4-fdeb-11e70e4f2715',
    '2022-09-11 06:37:55.191',
    'Java初心者なので、効率の良い方法があれば教えてください。',
    'JavaでTODOアプリを作る',
    50
  );

insert into
  public."_RequiredBy"
values
  (
    '97ced22e-f3cf-50c4-fdeb-11e70e4f2715',
    3
  );

insert into
  public."User"
values
  (50, 'aaa', 'gavinfielder', 'hello');

insert into
  public."User"('id', 'githubId', 'githubLogin', 'githubBio')
values
  (50, 'aaa', 'gavinfielder', 'hello');

insert into
  public."Profile"
values
  (
    50,
    '2022-09-10 08:36:21.659',
    'gavinfielder',
    5,
    '',
    50,
    '87bc9e7e-ea95-4cc7-84ea-52343099f231'
  );
